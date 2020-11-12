import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient as createApolloTestClient
} from "apollo-server-testing";
import cookie from "cookie";
import express from "express";
import httpMocks from "node-mocks-http";

import { AUTH_COOKIE_NAME } from "../../infra/config";
import { User } from "../../infra/database/entity";
import { generateAuthToken } from "../../infra/support/authentication";
import { createContext } from "./context";
import { rootSchema } from "./rootSchema";

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
        req.headers = {
          cookie: cookie.serialize(
            AUTH_COOKIE_NAME,
            generateAuthToken(currentUser)
          )
        };
      }

      return createContext({ req, res });
    }
  };

  return createApolloTestClient(new ApolloServer(config));
}
