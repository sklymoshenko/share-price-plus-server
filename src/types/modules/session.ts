const session = "express-session";
export = session;

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}
