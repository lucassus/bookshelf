import { ApolloServer } from "apollo-server-express";

import { ASSETS_BASE_URL } from "./config";
import { db } from "./db";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

export interface Context {
  assetsBaseUrl: string;
  db: typeof db;
}

const context: Context = {
  assetsBaseUrl: ASSETS_BASE_URL,
  db
};

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: true
});
