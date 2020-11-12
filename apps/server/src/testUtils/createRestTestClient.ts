import cookie from "cookie";
import express from "express";
import request from "supertest";

import { generateAuthToken } from "../common/authentication";
import { AUTH_COOKIE_NAME } from "../config";
import { User } from "../infrastucture/database/entity";
import { routes } from "../rest";

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

  app.use("/", routes);

  return request(app);
}
