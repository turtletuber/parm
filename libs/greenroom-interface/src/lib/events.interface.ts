
export const Event = 'event';
export const Slot = 'slot';
export const Comic = 'comic';

export interface Comic {
  _type: 'comic';
  firstName: string;
  lastName: string;
}

export interface Slot {
  _type: 'slot';
  comics: Comic[];
};

export interface Event {
  _type: 'event';
  date: string;
  place: string;
  slots: Slot[];
}

export function isEvent(o: any): o is Event {
  return o !== undefined && o !== null && o._type === Event;
}