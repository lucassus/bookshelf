import { ApolloServer } from "apollo-server";

import { rootValue } from "./rootValue";
import { typeDefs } from "./typeDefs";

const server = new ApolloServer({
  typeDefs,
  rootValue,
  introspection: true,
  playground: true,
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
