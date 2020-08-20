import express from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import { AUTH_COOKIE_NAME } from "../config";
import { User } from "../database/entity";
import { getAuthTokenSecretFor } from "./authTokens";

export async function authenticateRequest(
  req: express.Request
): Promise<undefined | User> {
  const { [AUTH_COOKIE_NAME]: authToken } = req.cookies;
  if (!authToken) {
    return undefined;
  }

  const payload = jwt.decode(authToken);
  if (!(payload && payload.sub)) {
    throw new Error("Invalid token payload");
  }

  const user = await getRepository(User).findOneOrFail({
    id: payload.sub
  });

  return new Promise((resolve, reject) => {
    jwt.verify(authToken, getAuthTokenSecretFor(user), (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}
