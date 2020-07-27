import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";

import { AUTH_TOKEN_EXPIRES_IN, AUTH_TOKEN_SECRET_KEY } from "../config";
import { User } from "../database/entity/User";

type AuthTokenPayload = {
  sub: number;
};

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
}

export function isPasswordValid(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateAuthToken(user: User): string {
  const payload: AuthTokenPayload = {
    sub: user.id
  };

  return jwt.sign(payload, AUTH_TOKEN_SECRET_KEY, {
    expiresIn: AUTH_TOKEN_EXPIRES_IN
  });
}

export function authenticateRequest(req: Request): null | number {
  const { authorization } = req.headers;

  if (!authorization) {
    return null;
  }

  const prefix = "Bearer ";
  if (!authorization.startsWith(prefix)) {
    return null;
  }

  const authToken = authorization.substring(
    prefix.length,
    authorization.length
  );

  const payload = jwt.verify(
    authToken,
    AUTH_TOKEN_SECRET_KEY
  ) as AuthTokenPayload;

  return payload.sub;
}

export function checkAuthentication(currentUser: User | undefined): User {
  if (!currentUser) {
    throw new Error("Unauthorized access! Please log in.");
  }

  return currentUser;
}

export function checkAdminAuthentication(currentUser: User | undefined): User {
  const user = checkAuthentication(currentUser);

  if (!user.isAdmin) {
    throw new Error("Unauthorized access! Please log in as admin.");
  }

  return user;
}
