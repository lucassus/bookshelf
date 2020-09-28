import {
  ApolloServerExpressConfig,
  AuthenticationError
} from "apollo-server-express";

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
    const authToken = getAuthTokenFromRequest(req);

    if (authToken) {
      try {
        const currentUser = await tradeAuthTokenForUser(authToken);
        return buildContext({ req, res, currentUser });
      } catch {
        throw new AuthenticationError("Invalid access token!");
      }
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
