import express from "express";

import { users } from "./users";

const routes = express.Router();

routes.use("/users", users);

export { routes as admin };
