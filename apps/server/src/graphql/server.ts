import { ApolloServer } from "apollo-server-express";

import { authenticateRequest } from "../common/authentication";
import { Environment, ENVIRONMENT } from "../config";
import { createContext } from "./context";
import { rootSchema } from "./rootSchema";

export const createApolloServer = () =>
  new ApolloServer({
    schema: rootSchema,
    context: createContext,
    subscriptions: {
      onConnect: async (params, ws, context) => {
        const currentUser = await authenticateRequest(context.request);
        return { currentUser };
      }
    },
    plugins: [
      {
        requestDidStart: (requestContext) => {
          console.log(
            `\n\n${requestContext.request.operationName} operation started`
          );
        }
      }
    ],
    debug: ENVIRONMENT === Environment.development,
    tracing: ENVIRONMENT === Environment.development,
    introspection: true,
    playground: {
      settings: {
        "request.credentials": "include"
      }
    },
    engine:
      ENVIRONMENT === Environment.production
        ? {
            reportSchema: true,
            debugPrintReports: true
          }
        : false
  });
