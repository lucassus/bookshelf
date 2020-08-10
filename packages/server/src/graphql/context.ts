import express from "express";
import { Connection, getConnection } from "typeorm";

import { ASSETS_BASE_URL } from "../config";
import { User } from "../database/entity";
import { buildAuthorsLoader } from "./authors/authorsLoader";

export interface Context {
  req: express.Request;
  res: express.Response;
  assetsBaseUrl: string;
  connection: Connection;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUser?: User;
}

export const buildContext = (
  contextExtra: {
    req: express.Request;
    res: express.Response;
  } & Partial<Context>
): Context => ({
  assetsBaseUrl: ASSETS_BASE_URL,
  authorsLoader: buildAuthorsLoader(),
  connection: getConnection(),
  currentUser: undefined,
  ...contextExtra
});
