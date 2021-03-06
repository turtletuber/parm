import { firebase as firebaseSecrets } from '@parm/util';
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Cloud Firestore through Firebase
// Initialize Firebase
firebase.initializeApp(firebaseSecrets);

var db = firebase.firestore();

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