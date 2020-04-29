#!/usr/bin/env ts-node-script

interface F5 {
  apps: App[],
}

interface App {
  name: string,
  favicon: string,
  title: string,
  metaTitle: string,
  metaDescription: string,
  header: string,
  rootText: string,
}

const fs = require('fs');
const path = require('path');
const f5: F5 = require('../f5');
const nunjucks = require('nunjucks');
const mkdirp = require('mkdirp');

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


const package = require('../package.json');

f5.apps.forEach(app => {
  const dist = resolve(`./dist/apps/${app.name}`);
  mkdirp.sync(dist);

  // write index.html
  (() => {
    const wt = resolve(dist + `/index.html`);
    const file = nunjucks.render('./templates/index.njk', app);
    fs.writeFileSync(wt, file, 'utf8');
  })();

  // write favicon.ico
  (() => {
    const wt = resolve(dist + `/favicon.ico`);
    const rt = resolve(app.favicon); 
    fs.copyFileSync(rt, wt);
  })();

  // update the firebase.json
  (() => {
    const fb = require('../firebase.json');
    const hostConfig = fb.hosting.find(c => c.target === app.name);
    if (!hostConfig) {
      fb.hosting.push({
        target: app.name,
        public: `dist/apps/${app.name}`,
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