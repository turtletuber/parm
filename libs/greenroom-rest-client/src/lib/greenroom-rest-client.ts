import Axios from  'axios-observable';
import { retry, filter, map } from 'rxjs/operators';
import { Event, EventRegistration, is } from '@parm/greenroom-interface';

export class EventsRestClient {
  constructor(private readonly host: string) {}
  endpoint = `${this.host}/api/v1/events/latest`;
  public getLatest() {
    return Axios.get(this.endpoint)
      .pipe(
        retry(3),
        map(o => o.data),
        filter(is<Event>(Event)),
      );
  }
}

export class EventRegistrationRestClient {
  constructor(private readonly host: string) {}
  endpoint = `${this.host}/api/v1/event-registration`;
  public post(dto: EventRegistration) {
    return Axios.post(this.endpoint, dto)
      .pipe(
        retry(3),
        map(o => o.data),
        filter(is<EventRegistration>(EventRegistration)),
      );
  }
}