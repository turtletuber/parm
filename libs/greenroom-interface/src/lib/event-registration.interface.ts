export const EventRegistration = 'event-registration';
export interface EventRegistration {
  eventId: string;
  _type: 'event-registration';
  order: number | null;
  firstName: string;
  lastName: string;
  email: string;
}