import express from "express";
import path from "path";
import "reflect-metadata";

import { Environment, ENVIRONMENT, PORT } from "./config";
import {
  createDevelopmentConnection,
  createProductionConnection
} from "./database/createConnection";
import { createServer } from "./server";

const startServer = async () => {
  await (ENVIRONMENT === Environment.production
    ? createProductionConnection()
    : createDevelopmentConnection());

  const server = createServer();

  const app = express();
  server.applyMiddleware({ app });

  const distDir = path.join(__dirname, "../../../web/dist");
  app.use(express.static(distDir));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });

  app.listen({ port: PORT });

  return server;
};

startServer()
  .then((server) => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
