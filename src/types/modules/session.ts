// import session = require("express-session");
import { ObjectId } from "mongoose";

declare module "express-session" {
  export interface SessionData {
    userId: ObjectId;
  }
}
