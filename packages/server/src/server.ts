import { ApolloServer } from "apollo-server-express";
import { Connection } from "typeorm";

import { authenticateRequest } from "./common/authentication";
import { Context } from "./common/types";
import { ASSETS_BASE_URL } from "./config";
import { buildAuthorsLoader } from "./database/authorsLoader";
import { User } from "./database/entity/User";
import { rootSchema } from "./graphql/schema";

export const createServer = (connection: Connection) =>
  new ApolloServer({
    schema: rootSchema,
    context: async ({ req }): Promise<Context> => {
      const userId = authenticateRequest(req);

      const currentUser =
        userId !== null
          ? await connection.manager.findOneOrFail(User, { id: userId })
          : undefined;

      return {
        assetsBaseUrl: ASSETS_BASE_URL,
        authorsLoader: buildAuthorsLoader(),
        connection,
        currentUser
      };
    },
    introspection: true,
    playground: true
  });
