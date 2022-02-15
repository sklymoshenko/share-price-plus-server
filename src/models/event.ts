import * as Mongoose from "mongoose";
import { ISpEvent } from "src/types/entities/event";
import { ISpParticipant } from "src/types/entities/user";
import { ISpParticipantVirtualThis } from "src/types/shared";

const ParticipantSchema: Mongoose.Schema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  paid: {
    type: Number,
    default: 0
  }
});

ParticipantSchema.virtual("ows").get(function (this: ISpParticipantVirtualThis): number {
  const { each } = this.parent();
  return this.paid > each ? 0 : each - this.paid;
});

ParticipantSchema.virtual("exceed").get(function (this: ISpParticipantVirtualThis): number {
  const { each } = this.parent();
  return this.paid > each ? this.paid - each : 0;
});

const HistoryItemChange: Mongoose.Schema = new Mongoose.Schema({
  name: String,
  participants: [ParticipantSchema],
  isClosed: {
    type: Boolean,
    default: false
  },
  closedAt: Date
});

const EventHistoryItemSchema: Mongoose.Schema = new Mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    change: HistoryItemChange
  },
  { timestamps: true }
);

const EventSchema: Mongoose.Schema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    participants: [ParticipantSchema],
    history: [EventHistoryItemSchema],
    isClosed: {
      type: Boolean,
      default: false
    },
    closedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

EventSchema.virtual("price").get(function (this: ISpEvent): number {
  if (!this.participants?.length) return 0;
  return this.participants.reduce((prev: number, curr: ISpParticipant) => prev + curr.paid, 0);
});

EventSchema.virtual("each").get(function (this: ISpEvent): number {
  if (!this.participants?.length) return 0;
  const price = this.participants.reduce((prev: number, curr: ISpParticipant) => prev + curr.paid, 0);
  return Math.floor(price / this.participants.length);
});

EventSchema.virtual("peopleCount").get(function (this: ISpEvent): number {
  return this.participants.length;
});

export const EventModel = Mongoose.model<ISpEvent>("SpEvent", EventSchema);
