import express from "express";

import { Environment } from "../../config";
import {
  authenticationMiddleware,
  adminAuthenticationMiddleware
} from "../middlewares";
import { admin } from "./admin";
import { auth } from "./auth";
import { books } from "./books";
import { me } from "./me";
import { seed } from "./seed";

const routes = express.Router();

// Public routes
routes.use("/auth", auth);
routes.use("/books", books);

// Authenticated routes
routes.use(authenticationMiddleware);
routes.use("/me", me);

// Admin routes
routes.use(adminAuthenticationMiddleware);
routes.use("/admin", admin);

if (process.env.NODE_ENV !== Environment.production) {
  routes.use("/seed", seed);
}

export { routes as api };
