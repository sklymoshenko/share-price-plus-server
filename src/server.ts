import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as Mongoose from "mongoose";
import { config } from "dotenv";

// Resolvers
import { UserResolver } from "./resolvers/user";

async function startServer() {
  try {
    config();

    const schema = await buildSchema({
      resolvers: [UserResolver],
      emitSchemaFile: true
    });

    const MONGO_USER = process.env.MONGO_USER;
    const MONGO_PASS = process.env.MONGO_PASS;

    await Mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@sharepriceplus.crwbo.mongodb.net/SharePricePlus?retryWrites=true&w=majority`
    );

    console.log("Mongodb is connected successfully");
    const server = new ApolloServer({
      schema,
      context: () => ({})
    });

    const app = Express();
    await server.start();
    server.applyMiddleware({ app });
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server: http://localhost:${PORT}, Playground: http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
