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

export interface IEventsWhere {
  id?: string;
  name?: string;
  price?: number;
  each?: number;
  peopleCount?: number;
  participans?: ISpParticipant["_id"][];
  isClosed?: boolean;
  closedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEventPayedPayload {
  total: number;
  each: number;
  participants: {
    _id: ISpParticipant["_id"];
    ows: ISpParticipant["ows"];
    paid: ISpParticipant["paid"];
    name: ISpParticipant["name"];
  }[];
}

export interface ISpEventHistoryItemChangeParticipants {
  _id: Mongoose.ObjectId;
  name: ISpParticipant["name"];
  paid?: ISpParticipant["paid"];
}

export interface ISpEventHistoryItemChange {
  _id: Mongoose.ObjectId;
  participants?: ISpEventHistoryItemChangeParticipants[];
  name?: ISpEvent["name"];
  isClosed?: ISpEvent["isClosed"];
  closedAt?: ISpEvent["closedAt"];
}
export interface ISpEventHistoryItem {
  _id: Mongoose.ObjectId;
  userId: Mongoose.ObjectId;
  userName: string;
  createdAt: Date;
  change: ISpEventHistoryItemChange;
}
