import express from "express";

import { books } from "./books";
import { users } from "./users";

const routes = express.Router();

routes.use("/books", books);
routes.use("/users", users);

export { routes as api };
