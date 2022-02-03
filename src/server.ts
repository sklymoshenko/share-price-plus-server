import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as Mongoose from "mongoose";
import { config } from "dotenv";

// Bc of esModuleInterop flague ts
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

// Bc ts-node-dev doesnt pick up any file that is not included in a entry file
require("./types/modules/session");

// Resolvers
import { UserResolver } from "./resolvers/user";
import { EventResolver } from "./resolvers/event";

async function startServer() {
  try {
    config();

    const schema = await buildSchema({
      resolvers: [UserResolver, EventResolver],
      emitSchemaFile: true,
      dateScalarMode: "isoDate"
    });

    const MONGO_USER = process.env.MONGO_USER;
    const MONGO_PASS = process.env.MONGO_PASS;
    const PORT = process.env.PORT;
    const HOST = process.env.HOST;
    const SESSION_SECRET = process.env.SESSION_SECRET || "localsecret";

    const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@sharepriceplus.crwbo.mongodb.net/SharePricePlus?retryWrites=true&w=majority`;
    await Mongoose.connect(mongoUrl);
    console.log("Mongodb is connected successfully");

    const app = Express();

    app.use(
      cors({
        credentials: true,
        origin: ["http://192.168.0.105:3000", "https://studio.apollographql.com", "http://localhost:3000"]
      })
    );

    app.use(
      session({
        store: MongoStore.create({
          mongoUrl
        }),
        name: "spid",
        secret: SESSION_SECRET,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          httpOnly: false
        }, // One day
        resave: false
      })
    );

    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({ req })
    });

    await server.start();
    server.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => {
      console.log(`Server: http://${HOST}:${PORT}, Playground: http://${HOST}:${PORT}/graphql`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
