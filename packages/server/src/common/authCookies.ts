import express from "express";

import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_EXPIRES_IN_SECONDS,
  Environment
} from "../config";

export const sendAuthCookie = (res: express.Response, authToken: string) =>
  res.cookie(AUTH_COOKIE_NAME, authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === Environment.production,
    maxAge: AUTH_TOKEN_EXPIRES_IN_SECONDS * 1000
  });

export const clearAuthCookie = (res: express.Response) =>
  res.clearCookie(AUTH_COOKIE_NAME);
