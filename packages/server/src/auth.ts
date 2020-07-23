import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "./database/entity/User";

// TODO: Move it to configuration module
const AUTH_TOKEN_SECRET_KEY = "asdf";
const AUTH_TOKEN_EXPIRES_IN = "15m";

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(password, salt);
}

export function isPasswordValid(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateAuthToken(user: User) {
  const payload = {
    sub: user.id
  };

  return jwt.sign(payload, AUTH_TOKEN_SECRET_KEY, {
    expiresIn: AUTH_TOKEN_EXPIRES_IN
  });
}
