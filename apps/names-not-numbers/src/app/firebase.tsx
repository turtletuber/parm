import * as firebase from 'firebase/app';
import { firebaseSecrets } from '@parm/util';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Cloud Firestore through Firebase
// Initialize Firebase
firebase.initializeApp(firebaseSecrets);
firebase.analytics();

var db = firebase.firestore();

// export const data = [];

// console.log('init firebase');
// db.collection('names').onSnapshot(e => {
//   e.docs.forEach(d => {
//     console.log('data', d.data());
//     data.push(d.data());
//   });
// });

import { useState, useEffect, useCallback } from 'react';
import uuidv1 from 'uuid/v1';

export function useData() {
  const [state, setState] = useState([]);
  const [guid, setGuid] = useState(uuidv1());
  const refreshData = useCallback(() => {
    setGuid(uuidv1());
    setState([]);
  }, [guid]);
  useEffect(() => {
    db.collection('names').onSnapshot(e => {
      setState(e.docs.map(d => d.data()));
    });
  }, [guid]);
  return {
    state,
    refreshData,
  }
}