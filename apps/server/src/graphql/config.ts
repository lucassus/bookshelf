import {
  getAuthTokenFromRequest,
  tradeAuthTokenForUser
} from "../common/authentication";
import { Environment } from "../config";
import { buildContext, Context } from "./context";
import { rootSchema } from "./rootSchema";

export const buildConfig = (environment: string = Environment.development) => ({
  schema: rootSchema,
  context: async ({ req, res }): Promise<Context> => {
    const authToken = getAuthTokenFromRequest(req);
    if (authToken) {
      const currentUser = await tradeAuthTokenForUser(authToken);
      return buildContext({ req, res, currentUser });
    }

    return buildContext({ req, res });
  },
  debug: environment === Environment.development,
  introspection: true,
  playground: true,
  engine: {
    reportSchema: true,
    debugPrintReports: true
  }
});
