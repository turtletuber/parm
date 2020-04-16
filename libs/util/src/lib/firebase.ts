// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { initConfig } from './util'; 

const config = initConfig({
  firebaseSecretsPath: process.env.FIREBASE_SECRETS_PATH || './env/parm-app.json',
  firebaseDatabaseUrl: process.env.FIREBASE_DATABASE_URL || 'https://parm-app.firebaseio.com',
});

type Firestore = firebase.firestore.Firestore;

let _db: Firestore | undefined;

const init = () => {
  let finalConfigLocation = config.firebaseSecretsPath;
  if (!path.isAbsolute(config.firebaseSecretsPath)) {
    finalConfigLocation = path.resolve(process.cwd(), config.firebaseSecretsPath);
  }
  firebase.initializeApp({
    credential: firebase.credential.cert(finalConfigLocation),
    databaseURL: config.firebaseDatabaseUrl,
  });
  _db = firebase.firestore();
  return _db;
}

export const db = () => {
  if (!_db) {
    _db = init();
  }
  return _db;
}