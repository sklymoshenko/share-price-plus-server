import * as Mongoose from "mongoose";
export interface ISpUser extends Mongoose.Document {
  _id: Mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  eventsCount?: number;
  totallSpent?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpLoaner {
  id: ISpUser["_id"];
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
