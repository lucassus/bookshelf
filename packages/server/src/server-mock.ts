import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";

import { PORT } from "./config";

const schema = loadSchemaSync(
  path.join(__dirname, "./graphql/**/schema.graphql"),
  {
    loaders: [new GraphQLFileLoader()]
  }
);

const app = express();

const server = new ApolloServer({
  schema,
  mocks: true
});

server.applyMiddleware({ app });
app.listen({ port: PORT });

console.log(
  `🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`
);
