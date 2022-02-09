import * as Mongoose from "mongoose";
import { ISpEvent } from "src/types/entities/event";
import { ISpParticipant } from "src/types/entities/user";

const EventSchema: Mongoose.Schema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    participants: {
      type: Array,
      default: []
    },
    isClosed: {
      type: Boolean,
      default: false
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
