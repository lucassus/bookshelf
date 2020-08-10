import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import { AUTH_TOKEN_EXPIRES_IN, AUTH_TOKEN_SECRET_KEY } from "../config";
import { User } from "../database/entity";

type AuthTokenPayload = {
  // Identifies the subject of the JWT.
  sub: number;

  // Identifies the time at which the JWT was issued.
  iat: number;

  // Identifies the expiration time on and after which the JWT must not be accepted for processing.
  exp: number;
};

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
}

export const isPasswordValid = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash);

export const generateAuthToken = (user: User): string =>
  jwt.sign({ sub: user.id }, AUTH_TOKEN_SECRET_KEY, {
    expiresIn: AUTH_TOKEN_EXPIRES_IN
  });

export function authenticateRequest(req: express.Request): null | number {
  const authToken = req.cookies?.jid;

  if (!authToken) {
    return null;
  }

  const payload = jwt.verify(
    authToken,
    AUTH_TOKEN_SECRET_KEY
  ) as AuthTokenPayload;

  return payload.sub;
}
