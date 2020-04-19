import { ApolloServer } from "apollo-server";

import { resolvers } from "./resolvers";
import { rootValue } from "./rootValue";
import { typeDefs } from "./typeDefs";

export const server = new ApolloServer({
  typeDefs,
  rootValue,
  resolvers,
  introspection: true,
  playground: true,
});
