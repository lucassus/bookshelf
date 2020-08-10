import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";

import { PORT } from "./config";
import { routes } from "./rest";
import { authenticationMiddleware } from "./rest/authenticationMiddleware";
import { createServer } from "./server";

const startServer = async () => {
  await createConnection();
  const apolloServer = createServer();

  const app = express();
  apolloServer.applyMiddleware({ app });

  const distDir = path.join(__dirname, "../../../web/dist");
  app.use(express.static(distDir));

  // TODO: A workaround, use it only in development mode
  // TODO: See https://github.com/benawad/jwt-auth-example
  app.use(
    cors({
      origin: "http://localhost:8080",
      credentials: true
    })
  );
  app.use(cookieParser());
  app.use(authenticationMiddleware);
  app.use("/", routes);
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
