import { ApolloServer } from "apollo-server-express";
import { Connection } from "typeorm";

import { ASSETS_BASE_URL } from "./config";
import { buildAuthorsLoader } from "./database/authorsLoader";
import { User } from "./database/entity/User";
import { rootSchema } from "./graphql/schema";
import { Context } from "./types";

export const createServer = (connection: Connection) =>
  new ApolloServer({
    schema: rootSchema,
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
