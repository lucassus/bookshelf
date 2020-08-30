import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient as createApolloTestClient
} from "apollo-server-testing";
import httpMocks from "node-mocks-http";

import { buildContext, Context } from "../graphql/context";
import { rootSchema } from "../graphql/rootSchema";

export function createTestClient(
  contextExtra: Partial<Context> = {}
): ApolloServerTestClient {
  const config = {
    schema: rootSchema,
    context: () =>
      buildContext({
        req: httpMocks.createRequest(),
        res: httpMocks.createResponse(),
        ...contextExtra
      })
  };

  return createApolloTestClient(new ApolloServer(config));
}
