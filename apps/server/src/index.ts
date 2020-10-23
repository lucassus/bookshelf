import { ApolloServer } from "apollo-server-express";
import express from "express";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";
import http from "http";
import path from "path";
import "reflect-metadata";
import { Container } from "typedi";
import { Connection, useContainer } from "typeorm";

import { authenticateRequest } from "./common/authentication";
import { ENVIRONMENT, Environment, PORT } from "./config";
import { createConnection } from "./database/createConnection";
import { createContext } from "./graphql/context";
import { rootSchema } from "./graphql/rootSchema";
import { routes } from "./rest";

useContainer(Container);

const startServer = async () => {
  const connection = await createConnection();
  Container.set(Connection, connection);

  const apolloServer = new ApolloServer({
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
            `\n\nGraphQL operation started: ${requestContext.request.operationName}`
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

  const app = express();
  apolloServer.applyMiddleware({ app });
  app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));

  app.use("/", routes);

  const distDir = path.join(__dirname, "../../../web/dist");
  app.use(express.static(distDir));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });

  // TODO: Refactor
  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);
  httpServer.listen(PORT);

  return apolloServer;
};

startServer()
  .then((server) => {
    console.log(
      `🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    );
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
