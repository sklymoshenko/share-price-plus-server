import * as Mongoose from "mongoose";
import { ISpParticipant } from "./user";

export interface ISpEvent extends Mongoose.Document {
  _id: Mongoose.ObjectId;
  name: string;
  price: number;
  each: number;
  peopleCount: number;
  participants: ISpParticipant[];
  isClosed: boolean;
  closedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
