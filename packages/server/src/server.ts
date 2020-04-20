import { ApolloServer } from "apollo-server";

import { ASSETS_BASE_URL } from "./config";
import { resolvers } from "./resolvers";
import { rootValue } from "./rootValue";
import { typeDefs } from "./typeDefs";

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
