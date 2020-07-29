import express from "express";

import { api } from "./api";
import { authenticationMiddleware } from "./authenticationMiddleware";

const routes = express.Router();

routes.use(authenticationMiddleware);
routes.use("/api", api);

export { routes };
