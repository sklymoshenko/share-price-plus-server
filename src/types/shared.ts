import { Request } from "express";

export interface IError {
  message: string;
}

export interface IContext {
  req: Request;
}
