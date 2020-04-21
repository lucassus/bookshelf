import express from "express";

import { PORT } from "./config";
import { server } from "./server";

const app = express();
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
