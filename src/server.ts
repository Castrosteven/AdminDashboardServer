import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { schema } from "./schema";
import { db } from "./context";
import { createServer } from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { Context, Message } from "graphql-ws";

const port = 5000;
const app = express();

const httpServer = createServer(app);

const getDynamicContext = async (ctx: Context, msg: Message) => {
  if (ctx.connectionParams && ctx.connectionParams.Authorization) {
    const accessToken = ctx.connectionParams.Authorization as string;
    const userObj = jwt.verify(accessToken, "SECRET") as User;
    const user = await db.user.findUnique({
      where: {
        id: userObj.id,
      },
    });
    return user;
  }
  // Otherwise let our resolvers know we don't have a current user
  return null;
};
export const startServer = async () => {
  try {
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/graphql",
    });
    const serverCleanup = useServer(
      {
        schema,
        context: (ctx, msg) => {
          return getDynamicContext(ctx, msg);
        },
      },
      wsServer
    );
    const server = new ApolloServer({
      schema,
      context: ({ req }) => {
        return {
          req,
          db,
        };
      },
      csrfPrevention: true,
      cache: "bounded",
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ],
    });
    await server.start();
    server.applyMiddleware({ app });
    httpServer.listen(port, () => {
      console.log(
        `The server is running on http://localhost:${port}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};
