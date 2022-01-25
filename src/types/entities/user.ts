import * as Mongoose from "mongoose";
import { ISpEvent } from "./event";

export interface ISpUser extends Mongoose.Document {
  _id: Mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  events: ISpEvent["_id"][];
  eventsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpLoaner {
  _id: ISpUser["_id"];
  name: ISpUser["name"];
  paid: ISpParticipant["paid"];
}

export interface ISpParticipant {
  _id: ISpUser["_id"];
  name: ISpUser["name"];
  paid: number;
  ows: number;
  exceed: number;
  loaners: ISpLoaner[];
}
