import {
  ApolloServerTestClient,
  createTestClient
} from "apollo-server-testing";
import { getConnection } from "typeorm";

import { createServer } from "./server";

export const getTestClient = (): ApolloServerTestClient => {
  const connection = getConnection();
  return createTestClient(createServer(connection));
};
