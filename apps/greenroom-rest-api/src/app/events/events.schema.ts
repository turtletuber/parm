import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  _type: String,
  date: String,
  place: String,
  slots: [{
    // Slot
    order: Number,
    comics: [{
      // Comic
      order: Number,
      firstName: String,
      lastName: String,
    }],
  }],
});