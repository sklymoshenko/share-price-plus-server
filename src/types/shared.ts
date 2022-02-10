import { Request } from "express";
import { ISpEvent } from "./entities/event";
import { ISpParticipant } from "./entities/user";

export interface IError {
  message: string;
}

export interface IContext {
  req: Request;
}

export interface ISpParticipantVirtualThis extends ISpParticipant {
  parent(): ISpEvent;
}
