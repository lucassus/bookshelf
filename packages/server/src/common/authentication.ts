import express from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";

import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_EXPIRES_IN_SECONDS,
  AUTH_TOKEN_SECRET_KEY,
  Environment
} from "../config";
import { User } from "../database/entity";

const getAuthTokenSecretFor = (user: User) =>
  [user.email, user.passwordHash, AUTH_TOKEN_SECRET_KEY].join(".");

export const generateAuthToken = (user: User): string =>
  jwt.sign({ sub: user.id }, getAuthTokenSecretFor(user), {
    expiresIn: AUTH_TOKEN_EXPIRES_IN_SECONDS
  });

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

export const sendAuthCookie = (res: express.Response, user: User) => {
  const authToken = generateAuthToken(user);

  return res.cookie(AUTH_COOKIE_NAME, authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === Environment.production,
    maxAge: AUTH_TOKEN_EXPIRES_IN_SECONDS * 1000
  });
};

export const clearAuthCookie = (res: express.Response) =>
  res.clearCookie(AUTH_COOKIE_NAME);
