import express from "express";
import path from "path";

import { PORT } from "./config";
import { server } from "./server";

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
