import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Cloud Firestore through Firebase
// todo: hide secrets
var firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var db = firebase.firestore();

console.log('init firebase');
db.collection('names').onSnapshot(e => {
  e.docs.forEach(d => {
    console.log('data', d.data());
  });
});