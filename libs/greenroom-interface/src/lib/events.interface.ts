export interface Comic {
  firstName: string;
  lastName: string;
}

export interface Slot {
  comics: Comic[];
};

export interface Event {
  date: string;
  place: string;
  slots: Slot[];
}
