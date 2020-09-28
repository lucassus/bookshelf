import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";
import path from "path";
import "reflect-metadata";
import { Container } from "typedi";
import { Connection, useContainer } from "typeorm";

import { ENVIRONMENT, Environment, PORT } from "./config";
import { createConnection } from "./database/createConnection";
import { buildContext } from "./graphql/context";
import { rootSchema } from "./graphql/rootSchema";
import { routes } from "./rest";

useContainer(Container);

const startServer = async () => {
  const connection = await createConnection();
  Container.set(Connection, connection);

  const app = express();
  app.use(cookieParser());

  const apolloServer = new ApolloServer({
    schema: rootSchema,
    context: buildContext,
    debug: ENVIRONMENT === Environment.development,
    introspection: true,
    playground: true,
    engine:
      ENVIRONMENT === Environment.production
        ? {
            reportSchema: true,
            debugPrintReports: true
          }
        : false
  });
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
