import cookie from "cookie";
import express from "express";
import { IncomingMessage } from "http";
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
  [user.passwordHash, AUTH_TOKEN_SECRET_KEY].join(".");

export const generateAuthToken = (user: User): string =>
  jwt.sign({ sub: user.email }, getAuthTokenSecretFor(user), {
    expiresIn: AUTH_TOKEN_EXPIRES_IN_SECONDS
  });

export const getAuthTokenFromRequest = (
  req: express.Request | IncomingMessage
): undefined | string => {
  const { [AUTH_COOKIE_NAME]: authToken } =
    cookie.parse(req.headers.cookie || "") || {};

  return authToken;
};

export async function tradeAuthTokenForUser(authToken: string): Promise<User> {
  const payload = jwt.decode(authToken);

  if (!payload || !payload.sub) {
    throw new Error("Invalid token payload");
  }

  const user = await getRepository(User).findOne({ email: payload.sub });

  if (!user) {
    throw new Error("User not found");
  }

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

export const authenticateRequest = async (
  req: express.Request | IncomingMessage
): Promise<undefined | User> => {
  const authToken = getAuthTokenFromRequest(req);

  if (!authToken) {
    return undefined;
  }

  return tradeAuthTokenForUser(authToken).catch(() => undefined);
};

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
