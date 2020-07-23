import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient
} from "apollo-server-testing";
import { getConnection } from "typeorm";

import { ASSETS_BASE_URL } from "../config";
import { buildAuthorsLoader } from "../database/authorsLoader";
import { User } from "../database/entity/User";
import { schemaWithResolvers } from "../graphql/schema";
import { Context } from "../types";

export const getTestClient = ({
  currentUser
}: {
  currentUser?: User;
} = {}): ApolloServerTestClient => {
  const context: Context = {
    assetsBaseUrl: ASSETS_BASE_URL,
    authorsLoader: buildAuthorsLoader(),
    connection: getConnection(),
    currentUser
  };

  const server = new ApolloServer({
    schema: schemaWithResolvers,
    context
  });

  return createTestClient(server);
};
