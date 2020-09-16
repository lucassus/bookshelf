import { authenticateRequest } from "../common/authentication";
import { Environment } from "../config";
import { buildContext, Context } from "./context";
import { rootSchema } from "./rootSchema";

export const buildConfig = (environment: string = Environment.development) => ({
  schema: rootSchema,
  context: async ({ req, res }): Promise<Context> => {
    const currentUser = await authenticateRequest(req);
    return buildContext({ req, res, currentUser });
  },
  debug: environment === Environment.development,
  introspection: true,
  playground: true,
  engine: {
    reportSchema: true,
    debugPrintReports: true
  }
});
