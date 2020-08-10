import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient as createApolloTestClient
} from "apollo-server-testing";
import express from "express";

import { buildContext, Context } from "../graphql/context";
import { rootSchema } from "../graphql/rootSchema";

export function createTestClient(
  contextExtra: Partial<Context> = {}
): ApolloServerTestClient {
  const server = new ApolloServer({
    schema: rootSchema,
    context() {
      // TODO: Ugly stub for express response
      const fakeRes = {
        cookie: () => {},
        clearCookie: () => {}
      } as unknown;

      return buildContext({
        req: {} as express.Request,
        res: fakeRes as express.Response,
        ...contextExtra
      });
    }
  });

  return createApolloTestClient(server);
}
