import { run } from './util';
import { fetch } from './apps';

export const preDeploy = async () => {
  const apps = await fetch.apps();
  const promises = apps.map(app => new Promise(r => {
    // firebase target:apply hosting stacktrace
    console.log(app);
    run('firebase', [
      'target:apply',
      'hosting',
      app.app,
      app.host,
    ]).then(r);
  }));
  await Promise.all(promises);
}