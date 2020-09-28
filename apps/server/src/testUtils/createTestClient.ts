import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient as createApolloTestClient
} from "apollo-server-testing";
import express from "express";
import httpMocks from "node-mocks-http";

import { generateAuthToken } from "../common/authentication";
import { AUTH_COOKIE_NAME } from "../config";
import { User } from "../database/entity";
import { buildContext } from "../graphql/context";
import { rootSchema } from "../graphql/rootSchema";

export function createTestClient({
  currentUser,
  res = httpMocks.createResponse()
}: {
  currentUser?: User;
  res?: express.Response;
} = {}): ApolloServerTestClient {
  const config = {
    schema: rootSchema,
    context: () => {
      const req = httpMocks.createRequest();

      if (currentUser) {
        req.cookies = {
          [AUTH_COOKIE_NAME]: generateAuthToken(currentUser)
        };
      }

      return buildContext(req, res);
    }
  };

  return createApolloTestClient(new ApolloServer(config));
}
