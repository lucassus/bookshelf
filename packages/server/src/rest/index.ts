import express from "express";

import { api } from "./api";

const routes = express.Router();

routes.use("/api", api);

export { routes };
