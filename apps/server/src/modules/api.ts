import express from "express";

import { Environment } from "../config";
import {
  authenticationMiddleware,
  adminAuthenticationMiddleware
} from "../infra/middlewares";
import { me } from "./accounts/api";
import { admin } from "./admin";
import { auth } from "./authentication/api";
import { books } from "./books/api";
import { seed } from "./seed/api";

const routes = express.Router();

// Public routes
if (process.env.NODE_ENV !== Environment.production) {
  routes.use("/seed", seed);
}

routes.use("/auth", auth);
routes.use("/books", books);

// Authenticated routes
routes.use(authenticationMiddleware);
routes.use("/me", me);

// Admin routes
routes.use(adminAuthenticationMiddleware);
routes.use("/admin", admin);

export { routes as api };
