export interface Comic {
  firstName: string;
  lastName: string;
}

export interface Slot {
  comics: Comic[];
};

export const Event = 'event';

export interface Event {
  _type: 'event';
  date: string;
  place: string;
  slots: Slot[];
}

export function isEvent(o: any): o is Event {
  return o !== undefined && o !== null && o._type === Event;
}
