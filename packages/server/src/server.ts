import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { Connection } from "typeorm";

import { ASSETS_BASE_URL } from "./config";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export const createServer = (connection: Connection) =>
  new ApolloServer({
    schema,
    context: {
      assetsBaseUrl: ASSETS_BASE_URL,
      connection
    } as Context,
    introspection: true,
    playground: true
  });
