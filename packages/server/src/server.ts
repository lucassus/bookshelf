import { ApolloServer } from "apollo-server-express";
import { Connection, createConnection } from "typeorm";

import config from "../ormconfig";
import { ASSETS_BASE_URL } from "./config";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
}

export const createServer = async () => {
  const connection = await createConnection(config);

  const context: Context = {
    assetsBaseUrl: ASSETS_BASE_URL,
    connection
  };

  return new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: true
  });
};
