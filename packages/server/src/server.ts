import { ApolloServer } from "apollo-server";

import { rootValue } from "./rootValue";
import { typeDefs } from "./typeDefs";

export const server = new ApolloServer({
  typeDefs,
  rootValue,
  introspection: true,
  playground: true,
});
