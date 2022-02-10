import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { execute, subscribe } from "graphql";
import * as Mongoose from "mongoose";
import { config } from "dotenv";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";

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
    const app = Express();
    const httpServer = createServer(app);

    const schema = await buildSchema({
      resolvers: [UserResolver, EventResolver],
      emitSchemaFile: true,
      dateScalarMode: "isoDate"
    });

    const subscriptionServer = SubscriptionServer.create(
      {
        schema,
        execute,
        subscribe
      },
      {
        server: httpServer,
        path: "/graphql"
      }
    );

    const MONGO_USER = process.env.MONGO_USER;
    const MONGO_PASS = process.env.MONGO_PASS;
    const PORT = process.env.PORT;
    const HOST = process.env.HOST;
    const SESSION_SECRET = process.env.SESSION_SECRET || "localsecret";

    const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@sharepriceplus.crwbo.mongodb.net/SharePricePlus?retryWrites=true&w=majority`;
    await Mongoose.connect(mongoUrl);
    console.log("Mongodb is connected successfully");

    app.use(
      cors({
        credentials: true,
        origin: [
          "http://192.168.0.103:3000",
          "https://studio.apollographql.com",
          "http://localhost:3000",
          "https://sharepriceplus.netlify.app"
        ]
      })
    );
    app.set("trust proxy", 1);
    app.use(
      session({
        store: MongoStore.create({
          mongoUrl
        }),
        name: "spid",
        secret: SESSION_SECRET,
        saveUninitialized: false,
        cookie: {
          path: "/",
          maxAge: 1000 * 60 * 60 * 24,
          secure: process.env.NODE_ENV === "production",
          httpOnly: false,
          sameSite: "none",
          domain: process.env.NODE_ENV === "production" ? "netlify.app" : "localhost"
        }, // One day
        resave: false
      })
    );

    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({ req }),
      plugins: [
        {
          async serverWillStart() {
            return {
              async drainServer() {
                subscriptionServer.close();
              }
            };
          }
        }
      ]
    });

    await server.start();
    server.applyMiddleware({ app, cors: false });
    httpServer.listen(PORT, () => {
      console.log(`Server: http://${HOST}:${PORT}, Playground: http://${HOST}:${PORT}/graphql`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
