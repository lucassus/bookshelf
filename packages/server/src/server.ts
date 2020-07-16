import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { getConnection } from "typeorm";

import { ASSETS_BASE_URL } from "./config";
import { buildAuthorsLoader } from "./database/authorsLoader";
import { resolvers } from "./graphql/resolvers";
import { Context } from "./types";

// TODO: Does not work on production
const schema = loadSchemaSync(path.join(__dirname, "./graphql/*.graphql"), {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

export const createServer = () =>
  new ApolloServer({
    schema: schemaWithResolvers,
    context: (): Context => ({
      assetsBaseUrl: ASSETS_BASE_URL,
      connection: getConnection(),
      authorsLoader: buildAuthorsLoader(),
      // TODO: Implement a proper authentication
      currentUserId: 1
    }),
    introspection: true,
    playground: true
  });
