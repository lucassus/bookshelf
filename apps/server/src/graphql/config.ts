import { ApolloServerExpressConfig } from "apollo-server-express";

import { Environment } from "../config";
import { buildContext } from "./context";
import { rootSchema } from "./rootSchema";

export const buildConfig = (
  environment: string = Environment.development
): ApolloServerExpressConfig => ({
  schema: rootSchema,
  context: buildContext,
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
