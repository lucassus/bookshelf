import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient as createApolloTestClient
} from "apollo-server-testing";
import cookie from "cookie";
import express from "express";
import httpMocks from "node-mocks-http";

import { createContext } from "../../modules/context";
import { rootSchema } from "../../modules/rootSchema";
import { AUTH_COOKIE_NAME } from "../config";
import { User } from "../database/entity";
import { generateAuthToken } from "../support/authentication";

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
