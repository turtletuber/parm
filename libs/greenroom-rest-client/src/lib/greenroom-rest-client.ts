import Axios from  'axios-observable';
import { retry, filter, map } from 'rxjs/operators';
import { isEvent } from '@parm/greenroom-interface';

const endpoint = 'http://localhost:3333/api/v1/events/latest';

export class EventsRestClient {
  public getLatest() {
    return Axios.get(endpoint)
      .pipe(
        retry(3),
        map(o => o.data),
        filter(isEvent),
      );
  }
}
