import { ApolloServer } from "apollo-server";

import { ASSETS_BASE_URL } from "./config";
import { db } from "./db";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    assetsBaseUrl: ASSETS_BASE_URL,
    db,
  },
  introspection: true,
  playground: true,
});
