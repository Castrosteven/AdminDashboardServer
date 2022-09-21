import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { schema } from "./schema";
import { db } from "./context";
const port = 5000;
const app = express();

export const startServer = async () => {
  try {
    const server = new ApolloServer({
      schema,
      context: ({ req }) => {
        return {
          req,
          db,
        };
      },
    });
    await server.start();
    server.applyMiddleware({ app });
    app.listen(port, () => {
      console.log(`The server is running on http://localhost:${port}/graphql`);
    });
  } catch (error) {
    console.error(error);
  }
};
