#!/usr/bin/env ts-node-script 
import { run } from './util';
import { fetch } from './apps';

const main = async () => {
  const apps = await fetch.apps();
  apps.forEach(app => {
    run('nx', [
      'run',
      `f5:bundle:${app.app}`,
    ]);
  });
}
main();