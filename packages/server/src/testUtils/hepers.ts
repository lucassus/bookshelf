import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient as createApolloTestClient
} from "apollo-server-testing";
import express from "express";
import request from "supertest";
import { getConnection } from "typeorm";

import { Context } from "../common/types";
import { ASSETS_BASE_URL } from "../config";
import { buildAuthorsLoader } from "../graphql/authors/authorsLoader";
import { rootSchema } from "../graphql/rootSchema";
import { routes } from "../rest";

export function createTestClient(
  context: Partial<Context> = {}
): ApolloServerTestClient {
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
}

export function createRestTestClient() {
  const app = express();
  app.use("/", routes);

  return request(app);
}
