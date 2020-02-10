import * as mongoose from 'mongoose';

export const EventRegistrationSchema = new mongoose.Schema({
  _type: String,
  eventId: String,
  order: Number,
  firstName: String,
  lastName: String,
  email: String,
});