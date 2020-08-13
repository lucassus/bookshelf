import express from "express";
import request from "supertest";

import { User } from "../database/entity";
import { routes } from "../rest";

export function createRestTestClient({
  currentUser
}: { currentUser?: User } = {}) {
  const app = express();

  if (currentUser) {
    app.use((req, res, next) => {
      req.user = currentUser;
      next();
    });
  }

  app.use("/", routes);

  return request(app);
}
