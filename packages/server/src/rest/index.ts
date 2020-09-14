import express from "express";

import { api } from "./api";
import { authenticationMiddleware } from "./authenticationMiddleware";

const routes = express.Router();

routes.use("/api", api);
routes.use(authenticationMiddleware);

export { routes };
