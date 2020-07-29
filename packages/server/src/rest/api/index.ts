import express from "express";

import { books } from "./books";

const routes = express.Router();

routes.use("/books", books);

export { routes as api };
