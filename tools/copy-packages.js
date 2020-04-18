#!/usr/bin/env node 
const fs = require('fs');
const path = require('path');

const resolve = t => path.resolve(__dirname, t);
const exists = t => fs.existsSync(resolve(t));
const writeJson = ({ fp, package }) => {
  const json = JSON.stringify(package, null, 2);
  const wt = resolve(fp);
  fs.writeFileSync(wt, json, 'utf8');
}
const readdirs = t =>
  fs.readdirSync(resolve(t), { withFileTypes: true })
    .filter(p => p.isDirectory())
    .map(p => p.name);

const copyPackageDependencies = ({
  location,
  packageName,
}) => {
  const fp = `../${location}/${packageName}/package.json`;
  const appPackage = exists(fp) ? require(fp) : {
    name: `@parm/${packageName}`,
    version: '0.0.0',
  };
  const dependencies = Object.assign({}, package.dependencies);
  appPackage.dependencies = dependencies;
  writeJson({
    fp,
    package: appPackage,
  }); 
};

const apps = readdirs('../apps');
const libs = readdirs('../libs');

const package = require('../package.json');

apps.forEach(app => copyPackageDependencies({
  location: 'apps',
  packageName: app,
}));

libs.forEach(app => copyPackageDependencies({
  location: 'libs',
  packageName: app,
}));