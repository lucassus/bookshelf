import { ApolloServer } from "@apollo/server";

import { Context, createContext, onSubscriptionConnect } from "./context";
import { rootSchema } from "./rootSchema";
import { Environment, ENVIRONMENT } from "~/infra/config";

export const createApolloServer = () =>
  new ApolloServer<Context>({
    schema: rootSchema,
    context: createContext,
    subscriptions: {
      onConnect: onSubscriptionConnect
    },
    debug: ENVIRONMENT === Environment.development,
    tracing: ENVIRONMENT === Environment.development,
    introspection: ENVIRONMENT !== Environment.production,
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
