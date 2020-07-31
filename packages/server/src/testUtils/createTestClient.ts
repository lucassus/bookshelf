import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerTestClient,
  createTestClient as createApolloTestClient
} from "apollo-server-testing";

import { buildContext, Context } from "../graphql/context";
import { rootSchema } from "../graphql/rootSchema";

export function createTestClient(
  contextExtra: Partial<Context> = {}
): ApolloServerTestClient {
  const server = new ApolloServer({
    schema: rootSchema,
    context: buildContext(contextExtra)
  });

  return createApolloTestClient(server);
}
