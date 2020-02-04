export const EventRegistration = 'event-registration';
export interface EventRegistration {
  eventId: string;
  slot: number | null;
  firstName: string;
  lastName: string;
  email: string;
}