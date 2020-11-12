import cookie from "cookie";
import express from "express";
import request from "supertest";

import { api as apiRoutes } from "../../modules/api";
import { AUTH_COOKIE_NAME } from "../config";
import { User } from "../database/entity";
import { generateAuthToken } from "../support/authentication";

export function createRestTestClient({
  authToken,
  currentUser
}: { currentUser?: User; authToken?: string } = {}) {
  const app = express();

  app.use((req, res, next) => {
    const token = authToken || (currentUser && generateAuthToken(currentUser));

    if (token) {
      req.headers = {
        cookie: cookie.serialize(AUTH_COOKIE_NAME, token)
      };
    }

    next();
  });

  app.use("/api", apiRoutes);

  return request(app);
}
