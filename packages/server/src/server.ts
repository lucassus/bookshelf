import { ApolloServer } from "apollo-server";

import { ASSETS_BASE_URL } from "./config";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    assetsBaseUrl: ASSETS_BASE_URL,
  },
  introspection: true,
  playground: true,
});
