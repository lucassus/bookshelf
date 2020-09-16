import express from "express";

import { Environment } from "../../config";
import { authenticationMiddleware } from "../authenticationMiddleware";
import { auth } from "./auth";
import { books } from "./books";
import { seed } from "./seed";
import { users } from "./users";

const routes = express.Router();

routes.use(authenticationMiddleware);
routes.use("/auth", auth);
routes.use("/books", books);
routes.use("/users", users);

if (process.env.NODE_ENV !== Environment.production) {
  routes.use("/seed", seed);
}

export { routes as api };
