import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient as createApolloTestClient
} from "apollo-server-testing";
import { getConnection } from "typeorm";

import { Context } from "../common/types";
import { ASSETS_BASE_URL } from "../config";
import { buildAuthorsLoader } from "../database/authorsLoader";
import { rootSchema } from "../graphql/rootSchema";

export const createTestClient = (
  context: Partial<Context> = {}
): ApolloServerTestClient => {
  const server = new ApolloServer({
    schema: rootSchema,
    context: {
      assetsBaseUrl: ASSETS_BASE_URL,
      authorsLoader: buildAuthorsLoader(),
      connection: getConnection(),
      ...context
    }
  });

  return createApolloTestClient(server);
};
