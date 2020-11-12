import express from "express";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";
import http from "http";
import path from "path";
import "reflect-metadata";
import { Container } from "typedi";
import { Connection, useContainer } from "typeorm";

import { Environment, ENVIRONMENT, PORT } from "./config";
import { createConnection } from "./infra/database/createConnection";
import { api as apiRoutes } from "./modules/api";
import { createApolloServer } from "./modules/server";

useContainer(Container);

const configureAndStartServer = async () => {
  const apolloServer = createApolloServer();

  const app = express();
  apolloServer.applyMiddleware({ app });
  app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));

  app.use("/api", apiRoutes);

  if (ENVIRONMENT === Environment.production) {
    const distDir = path.join(__dirname, "../../../web/dist");
    app.use(express.static(distDir));
    app.get("/*", (req, res) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  const httpServer = http.createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);
  httpServer.listen(PORT);

  console.log(
    `🚀 GraphQL server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
  );
};

createConnection()
  .then((connection) => Container.set(Connection, connection))
  .then(() => configureAndStartServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
