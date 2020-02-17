import { useState, useEffect, useCallback } from 'react';
import { EventsRestClient } from '@parm/greenroom-rest-client';
import { Event } from '@parm/greenroom-interface';
import { host } from './app';
import uuidv1 from 'uuid/v1';

interface Data {
  hasFetched: boolean;
  isLoading: boolean;
  err?: any;
  data?: Event;
}

const initialData: Data = {
  hasFetched: false,
  isLoading: false,
};

export function useEvents() {
  const client = new EventsRestClient(host);
  const [state, setState] = useState({...initialData});
  const [guid, setGuid] = useState(uuidv1());
  const refreshData = useCallback(() => {
    setGuid(uuidv1());
    setState({...state, isLoading: true });
  }, [guid]);
  useEffect(() => {
      client.getLatest()
        .subscribe(
          data => setState({ 
            ...state,
            hasFetched: true,
            isLoading: false,
            data 
          }),
          err => setState({ 
            ...state,
            hasFetched: true,
            isLoading: false,
            err 
          }),
        );
  }, [guid]);
  return {
    state,
    refreshData,
  }
}