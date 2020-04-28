import { ApolloServer } from "apollo-server-express";
import { Connection } from "typeorm";

import { ASSETS_BASE_URL } from "./config";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
}

export const createServer = (connection: Connection) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: {
      assetsBaseUrl: ASSETS_BASE_URL,
      connection
    } as Context,
    introspection: true,
    playground: true
  });
