import * as Mongoose from "mongoose";
import { ISpEvent } from "./event";

export interface ISpUser extends Mongoose.Document {
  id: Mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  events: ISpEvent["id"][];
  eventsCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpLoaner {
  id: ISpUser["_id"];
  name: ISpUser["name"];
  paid: ISpParticipant["paid"];
}

export interface ISpParticipant {
  id: ISpUser["_id"];
  name: ISpUser["name"];
  paid: number;
  ows: number;
  exceed: number;
  loaners: ISpLoaner[];
}
