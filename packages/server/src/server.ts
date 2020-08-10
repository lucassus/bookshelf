import { ApolloServer } from "apollo-server-express";
import { getConnection } from "typeorm";

import { authenticateRequest } from "./common/authentication";
import { User } from "./database/entity";
import { buildContext, Context } from "./graphql/context";
import { rootSchema } from "./graphql/rootSchema";

export const createServer = () =>
  new ApolloServer({
    schema: rootSchema,
    context: async ({ req, res }): Promise<Context> => {
      const userId = authenticateRequest(req);

      const currentUser =
        userId !== null
          ? await getConnection().manager.findOneOrFail(User, { id: userId })
          : undefined;

      return buildContext({ req, res, currentUser });
    },
    introspection: true,
    playground: true
  });
