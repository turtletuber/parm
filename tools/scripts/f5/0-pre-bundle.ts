#!/usr/bin/env ts-node-script

import { App } from './interface';
import { firebase } from './firebase';
import { 
  environment, writeEnv, writeJson
} from './util';

import * as nunjucks from 'nunjucks';

nunjucks.configure({
  autoescape: false,
}); 

const main = async () => {
  const env = environment();
  const collection = `${env}.parm.f5.apps`;

  const e = await firebase()
    .firestore()
    .collection(collection)
    .get();
    
  const workspace = require('../../../angular.json');
  const f5 = workspace.projects.f5;
  const buildTarget = f5.architect.build;
  const bundleTarget = f5.architect.bundle;
  const serveTarget = f5.architect.serve;
  
  const apps: App[] = e.docs.map(d => d.data() as App);
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