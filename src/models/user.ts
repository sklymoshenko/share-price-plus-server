import * as Mongoose from "mongoose";
import { ISpUser } from "src/types/entities/user";

const UserSchema: Mongoose.Schema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    eventsCount: {
      type: Number,
      default: 0
    },
    totallSpent: {
      type: Number,
      default: 0
    },
    events: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "SpEvent",
      default: []
    }
  },
  { timestamps: true }
);

export const UserModel = Mongoose.model<ISpUser>("SpUser", UserSchema);
