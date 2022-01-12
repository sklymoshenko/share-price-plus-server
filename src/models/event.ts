import * as Mongoose from "mongoose";
import { ISpUser } from "./user";

export interface ISpEvent extends Mongoose.Document {
  _id: Mongoose.ObjectId;
  name: string;
  price: number;
  each: number;
  peopleCount: number;
  participants: ISpUser[];
  isClosed: boolean;
  closedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

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
    participants: [
      {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "SpUser"
      }
    ]
  },
  { timestamps: true }
);

export const EventModel = Mongoose.model<ISpEvent>("SpEvent", EventSchema);
