import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { Connection } from "typeorm";

import { ASSETS_BASE_URL } from "./config";
import { buildAuthorsLoader } from "./database/authorsLoader";
import { User } from "./database/entity/User";
import { resolvers } from "./graphql/resolvers";
import { Context } from "./types";

const schema = loadSchemaSync(path.join(__dirname, "./graphql/**/*.graphql"), {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
  inheritResolversFromInterfaces: true
});

export const createServer = (connection: Connection) =>
  new ApolloServer({
    schema: schemaWithResolvers,
    context: async (): Promise<Context> => {
      const currentUser = await connection.manager.findOne(User, {
        name: "Bob"
      });

      return {
        assetsBaseUrl: ASSETS_BASE_URL,
        connection,
        authorsLoader: buildAuthorsLoader(),
        currentUser
      };
    },
    introspection: true,
    playground: true
  });
