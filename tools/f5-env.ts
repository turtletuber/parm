#!/usr/bin/env ts-node-script

interface F5 {
  apps: App[],
}

interface App {
  app: string,
  // favicon: string,
  title: string,
  metaTitle: string,
  metaDescription: string,
  header: string,
  numResponses: number,
  maxResponses: number,
  // rootText: string,
}

const fs = require('fs');
const path = require('path');
const f5: F5 = require('../f5');
const nunjucks = require('nunjucks');
const mkdirp = require('mkdirp');
const firebase = require('firebase-admin');

nunjucks.configure({
  autoescape: false,
});

const resolve = t => {
  if (!path.isAbsolute(t)) {
    return path.resolve(process.cwd(), t);
  }
  return path.resolve(__dirname, t);
}
const exists = t => fs.existsSync(resolve(t));
const writeJson = ({ fp, data }) => {
  const json = JSON.stringify(data, null, 2);
  const wt = resolve(fp);
  fs.writeFileSync(wt, json, 'utf8');
}

const writeEnv = ({ fp, data }) => {
  const json = JSON.stringify(data, null, 2);
  const wt = resolve(fp);
  const file = nunjucks.render('./templates/environment.njk', { json });
  fs.writeFileSync(wt, file, 'utf8');
}

const environment = () => {
  const env = process.env.NODE_ENV || 'production';
  switch (env) {
    case 'production':
      return 'prod';
    case 'qa':
      return 'qa';
    case 'development':
      return 'dev';
    case 'test':
      return 'test';
  }
}

const db = () => {
  const config = {
    firebaseSecretsPath: './env/parm-app.json',
    firebaseDatabaseUrl: 'https://parm-app.firebaseio.com',
  }; 
  let finalConfigLocation = config.firebaseSecretsPath;
  if (!path.isAbsolute(config.firebaseSecretsPath)) {
    finalConfigLocation = path.resolve(process.cwd(), config.firebaseSecretsPath);
  }
  firebase.initializeApp({
    credential: firebase.credential.cert(finalConfigLocation),
    databaseURL: config.firebaseDatabaseUrl,
  });
  return firebase.firestore();
}

const main = async () => {
  const env = environment();
  const collection = `${env}.parm.f5.apps`;

  const e = await db()
    .collection(collection)
    .get();
    
  const workspace = require('../angular.json');
  const f5 = workspace.projects.f5;
  const buildTarget = f5.architect.build;
  const bundleTarget = f5.architect.bundle;
  const serveTarget = f5.architect.serve;
  
  const apps: App[] = e.docs.map(d => d.data());
  apps.forEach(app => {
    // save the app config in the source dir
    const fp = `./apps/f5/src/environments/${app.app}.ts`;
    writeEnv({ fp, data: app });

    const configuration = {
      "outputPath": `dist/apps/${app.app}`,
      "fileReplacements": [
        {
          "replace": "apps/f5/src/environments/environment.ts",
          "with": fp,
        },
      ]
    };

    // right now, callously overwrite any existing 
    // config for 'app'

    // instruct build  and bundle target for 'app' to 
    // use the new env file
    buildTarget.configurations = {
      ...buildTarget.configurations,
      [app.app]: {...configuration},
    };
    bundleTarget.configurations = {
      ...bundleTarget.configurations,
      [app.app]: {...configuration},
    }; 
    // add a serve target for our new 
    // build target
    serveTarget.configurations = {
      ...serveTarget.configurations,
      [app.app]: { buildTarget: `fb:build:${app.app}` },
    };

    writeJson({
      fp: './angular.json',
      data: workspace,
    });
  });

  
}
main();