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
import { storage } from './storage';
import uuidv1 from 'uuid/v1';

export interface Option {
  parent: string;
  children: string[];
  text: string;
  id: string;
  type: 'prompt' | 'action';
  creatorId: string;
  createTime: firebase.firestore.Timestamp;
}

interface State {
  nodes: Option[],
  prev: Option[],
  root: Option,
  current: string,
}

const initialState: State = {
  nodes: [],
  prev: [],
  root: null,
  current: null,
}; 

const fetch = async () => {
  const e = await db.collection('f5').get();
  const nodes: any[] = e.docs.map(d => ({
    id: d.id,
    ...d.data(),
  }));
  return {
    nodes,
    root: nodes.find(n => n.isRoot),
  }
}

export function useData() {
  const [state, setState] = useState({...initialState});
  const [guid, setGuid] = useState(uuidv1());
  const setCurrent = (current: string) => {
    setState({
        ...state,
        current,
        prev: [...state.prev, state.nodes.find(n => n.id === current)],
    });
  };
  async function createOption({ text, parent, type }: { text: string, parent: string, type: 'prompt' | 'action' }) {
    const creatorId = storage.userId();
    const createTime = firebase.firestore.Timestamp.fromDate(new Date());
    const optionRef = await db.collection('f5').add({
      creatorId,
      createTime,
      text,
      children: [],
      parent,
      type,
    });
    const option: Option = {
      creatorId: storage.userId(),
      createTime,
      text,
      children: [],
      parent,
      type,
      id: optionRef.id,
    };
    let parentNode = state.nodes.find(n => n.id === parent);
    parentNode.children.push(option.id);
    await db.collection('f5').doc(parentNode.id).update(parentNode);
    const { nodes, root } = await fetch();
    parentNode = nodes.find(n => n.id === parent);
    setState({
        root,
        nodes,
        current: option.id,
        prev: [...state.prev, option],
    });
  }
  useEffect(() => {
    fetch().then(({nodes, root}) => setState({
        ...state,
        current: state.current || root.id,
        nodes,
        root,
      }));
  }, [guid]);
  return {
    state,
    setCurrent,
    createOption,
  }
}
