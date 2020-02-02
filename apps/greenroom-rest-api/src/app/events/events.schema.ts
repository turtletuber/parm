import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  _type: String,
  date: String,
  place: String,
  slots: [{
    comics: [{
      firstName: String,
      lastName: String,
    }]
  }],
});