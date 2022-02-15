import * as Mongoose from "mongoose";
import { ISpEvent } from "./event";

export interface ISpUser extends Mongoose.Document {
  _id: Mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  events: ISpEvent["_id"][];
  friends: ISpUser["_id"][];
  eventsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpParticipant {
  _id: ISpUser["_id"];
  name: ISpUser["name"];
  paid: number;
  ows: number;
  exceed: number;
}
