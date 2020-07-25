import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient
} from "apollo-server-testing";
import { getConnection } from "typeorm";

import { ASSETS_BASE_URL } from "../config";
import { buildAuthorsLoader } from "../database/authorsLoader";
import { rootSchema } from "../graphql/schema";
import { Context } from "../types";

export const getTestClient = (
  context: Partial<Context> = {}
): ApolloServerTestClient => {
  const server = new ApolloServer({
    schema: rootSchema,
    context: {
      ...context,
      assetsBaseUrl: ASSETS_BASE_URL,
      authorsLoader: buildAuthorsLoader(),
      connection: getConnection()
    }
  });

  return createTestClient(server);
};
