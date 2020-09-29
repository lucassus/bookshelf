import express from "express";
import request from "supertest";

import { generateAuthToken } from "../common/authentication";
import { AUTH_COOKIE_NAME } from "../config";
import { User } from "../database/entity";
import { routes } from "../rest";

export function createRestTestClient({
  authToken,
  currentUser
}: { currentUser?: User; authToken?: string } = {}) {
  const app = express();

  app.use((req, res, next) => {
    if (authToken) {
      req.cookies = { [AUTH_COOKIE_NAME]: authToken };
    }

    if (currentUser) {
      req.cookies = {
        [AUTH_COOKIE_NAME]: generateAuthToken(currentUser)
      };
    }

    next();
  });

  app.use("/", routes);

  return request(app);
}
