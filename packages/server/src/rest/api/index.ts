import express from "express";

import { auth } from "./auth";
import { books } from "./books";
import { users } from "./users";

const routes = express.Router();

routes.use("/auth", auth);
routes.use("/books", books);
routes.use("/users", users);

export { routes as api };
