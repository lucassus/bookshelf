import jwt from "jsonwebtoken";

import {
  AUTH_TOKEN_EXPIRES_IN_SECONDS,
  AUTH_TOKEN_SECRET_KEY
} from "../config";
import { User } from "../database/entity";

export const getAuthTokenSecretFor = (user: User) =>
  [user.email, user.passwordHash, AUTH_TOKEN_SECRET_KEY].join(".");

export const generateAuthToken = (user: User): string =>
  jwt.sign({ sub: user.id }, getAuthTokenSecretFor(user), {
    expiresIn: AUTH_TOKEN_EXPIRES_IN_SECONDS
  });
