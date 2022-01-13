import * as Mongoose from "mongoose";
import { ISpEvent } from "src/types/entities/event";

const EventSchema: Mongoose.Schema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    each: {
      type: Number,
      default: 0
    },
    peopleCount: {
      type: Number,
      default: 0
    },
    participants: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

export const EventModel = Mongoose.model<ISpEvent>("SpEvent", EventSchema);
