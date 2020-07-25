import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient
} from "apollo-server-testing";
import { getConnection } from "typeorm";

import { ASSETS_BASE_URL } from "../config";
import { buildAuthorsLoader } from "../database/authorsLoader";
import { User } from "../database/entity/User";
import { rootSchema } from "../graphql/schema";

export const getTestClient = ({
  currentUser
}: {
  currentUser?: User;
} = {}): ApolloServerTestClient => {
  const server = new ApolloServer({
    schema: rootSchema,
    context: {
      assetsBaseUrl: ASSETS_BASE_URL,
      authorsLoader: buildAuthorsLoader(),
      connection: getConnection(),
      currentUser
    }
  });

  return createTestClient(server);
};
