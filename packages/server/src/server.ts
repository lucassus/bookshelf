import { ApolloServer } from "apollo-server-express";

import { authenticateRequest } from "./common/authentication";
import { buildContext, Context } from "./graphql/context";
import { rootSchema } from "./graphql/rootSchema";

export const createServer = () =>
  new ApolloServer({
    schema: rootSchema,
    context: async ({ req, res }): Promise<Context> => {
      const currentUser = await authenticateRequest(req);
      return buildContext({ req, res, currentUser });
    },
    introspection: true,
    playground: true
  });
