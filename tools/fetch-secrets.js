#!/usr/bin/env node 
const fs = require('fs');
const path = require('path');
const firebase = require('firebase-admin');

const main = async () => { 
  const env = process.env.NODE_ENV || 'production';
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
  const db = firebase.firestore();

  const doc = await db
    .collection('config')
    .doc(env)
    .get();
  const secrets = doc.data();

  const resolve = t => path.resolve(__dirname, t);
  const writeJson = ({ fp, data }) => {
    const json = JSON.stringify(data, null, 2);
    const wt = resolve(fp);
    fs.writeFileSync(wt, json, 'utf8');
  }

  const location = 'libs';
  const packageName = 'util';
  const fp = `../${location}/${packageName}/env/secrets.json`;
  writeJson({ fp, data: secrets });
}
main();