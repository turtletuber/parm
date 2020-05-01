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

  const apps: App[] = e.docs.map(d => d.data());
  apps.forEach(async app => {
    const dist = resolve(`./dist/apps/${app.app}`);
    mkdirp.sync(dist);

    // write index.html
    (() => {
      const wt = resolve(dist + `/index.html`);
      const file = nunjucks.render('./templates/index.njk', app);
      fs.writeFileSync(wt, file, 'utf8');
    })();

    // write favicon.ico
    const options = {
      destination: resolve(dist + `/favicon.ico`),
    };
    // const bucket = (`app-${app.app}`);
    const bucket = 'parm-app.appspot.com';
    // await firebase
    await firebase
      .storage()
      .bucket(bucket)
      .file('f5/favicon.ico')
      .download(options)
      ;
    // update the firebase.json
    (() => {
      const fb = require('../firebase.json');
      const hostConfig = fb.hosting.find(c => c.target === app.app);
      if (!hostConfig) {
        fb.hosting.push({
          target: app.app,
          public: `dist/apps/${app.app}`,
          ignore: [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
          ],
          rewrites: [
            {
              "source": "**",
              "destination": "/index.html"
            }
          ]
        });
      }
      const fp = resolve(`./firebase.json`);
      writeJson({ fp, data: fb });
    })();

  });


}
main();
