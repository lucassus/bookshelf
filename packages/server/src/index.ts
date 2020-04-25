import express from "express";
import path from "path";
import "reflect-metadata";

import { PORT } from "./config";
import { createServer } from "./server";

const startServer = async () => {
  const server = await createServer();

  const app = express();
  server.applyMiddleware({ app });

  const distDir = path.join(__dirname, "../../web/dist");
  app.use(express.static(distDir));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });

  app.listen({ port: PORT }, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

startServer().catch((error) => {
  console.error(error);
});
