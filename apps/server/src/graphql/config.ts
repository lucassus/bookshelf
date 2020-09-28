import { ApolloServerExpressConfig } from "apollo-server-express";

import {
  getAuthTokenFromRequest,
  tradeAuthTokenForUser
} from "../common/authentication";
import { Environment } from "../config";
import { buildContext, Context } from "./context";
import { rootSchema } from "./rootSchema";

export const buildConfig = (
  environment: string = Environment.development
): ApolloServerExpressConfig => ({
  schema: rootSchema,
  context: async ({ req, res }): Promise<Context> => {
    // TODO: Or just use `req.currentUser` and share the auth middleware
    const authToken = getAuthTokenFromRequest(req);

    // TODO: Rethink this approach and figure out how to test it
    if (authToken) {
      const currentUser = await tradeAuthTokenForUser(authToken).catch(
        () => undefined
      );
      return buildContext({ req, res, currentUser });
    }

    return buildContext({ req, res });
  },
  debug: environment === Environment.development,
  introspection: true,
  playground: true,
  engine:
    environment === Environment.production
      ? {
          reportSchema: true,
          debugPrintReports: true
        }
      : false
});
