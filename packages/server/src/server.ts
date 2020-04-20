import { ApolloServer } from "apollo-server";

import { ASSETS_BASE_URL } from "./config";
import { resolvers } from "./graphql/resolvers";
import { rootValue } from "./graphql/rootValue";
import { typeDefs } from "./graphql/typeDefs";

export const server = new ApolloServer({
  typeDefs,
  rootValue,
  resolvers,
  context: {
    assetsBaseUrl: ASSETS_BASE_URL,
  },
  introspection: true,
  playground: true,
});
