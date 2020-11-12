import { Environment } from "@/infra/config";
import {
  authenticationMiddleware,
  adminAuthenticationMiddleware
} from "@/interfaces/http/middlewares";
import express from "express";

import { me } from "./accounts/routes";
import { admin } from "./admin";
import { auth } from "./authentication/routes";
import { books } from "./books/routes";
import { seed } from "./seed/routes";

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
