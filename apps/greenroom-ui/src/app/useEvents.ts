import { useState, useEffect } from 'react';
import { EventsRestClient } from '@parm/greenroom-rest-client';
import { Event } from '@parm/greenroom-interface';
import { host } from './app';

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
            hasFetched: true,
            isLoading: false,
            ...state,
            err 
          }),
        );
  }, []);
  return state;
}