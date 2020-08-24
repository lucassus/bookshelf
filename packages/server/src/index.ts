import cookieParser from "cookie-parser";
import express from "express";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";
import path from "path";
import "reflect-metadata";
import { Container } from "typedi";
import { createConnection, useContainer, Connection } from "typeorm";

import { PORT } from "./config";
import { routes } from "./rest";
import { authenticationMiddleware } from "./rest/authenticationMiddleware";
import { createServer } from "./server";

useContainer(Container);

const startServer = async () => {
  const connection = await createConnection();
  Container.set(Connection, connection);

  const app = express();
  app.use(cookieParser());
  app.use(authenticationMiddleware);

  const apolloServer = createServer();
  apolloServer.applyMiddleware({ app });
  app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));

  app.use("/", routes);

  const distDir = path.join(__dirname, "../../../web/dist");
  app.use(express.static(distDir));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });

  app.listen({ port: PORT });

  return apolloServer;
};

startServer()
  .then((server) => {
    console.log(
      `🚀 GraphQL server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
