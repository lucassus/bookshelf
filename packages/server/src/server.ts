import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { Connection } from "typeorm";

import { ASSETS_BASE_URL } from "./config";
import { resolvers } from "./graphql/resolvers";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
}

const schema = loadSchemaSync(path.join(__dirname, "./graphql/*.graphql"), {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

export const createServer = (connection: Connection) =>
  new ApolloServer({
    schema: schemaWithResolvers,
    context: {
      assetsBaseUrl: ASSETS_BASE_URL,
      connection
    } as Context,
    introspection: true,
    playground: true
  });
