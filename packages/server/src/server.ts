import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { getConnection } from "typeorm";

import { ASSETS_BASE_URL } from "./config";
import { buildAuthorsLoader } from "./database/authorsLoader";
import { User } from "./database/entity/User";
import { resolvers } from "./graphql/resolvers";
import { Context } from "./types";

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
    context: async (): Promise<Context> => {
      const connection = getConnection();

      const currentUser = await connection.manager.findOne(User, {
        name: "Bob"
      });

      return {
        assetsBaseUrl: ASSETS_BASE_URL,
        connection: getConnection(),
        authorsLoader: buildAuthorsLoader(),
        currentUser
      };
    },
    introspection: true,
    playground: true
  });
