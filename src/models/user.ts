import * as Mongoose from "mongoose";
export interface ISpUser extends Mongoose.Document {
  _id: Mongoose.ObjectId;
  name: string;
  email: string;
  password: string;
  eventsCount?: number;
  totallSpent?: number;
}

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
    }
  },
  { timestamps: true }
);

export const UserModel = Mongoose.model<ISpUser>("SpUser", UserSchema);
