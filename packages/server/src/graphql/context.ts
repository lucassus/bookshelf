import express from "express";
import { Container } from "typedi";
import { Connection } from "typeorm";

import { ASSETS_BASE_URL } from "../config";
import { User } from "../database/entity";
import { buildAuthorsLoader } from "./authors/authorsLoader";

export interface Context {
  req: express.Request;
  res: express.Response;
  injector: typeof Container;
  connection: Connection;
  assetsBaseUrl: string;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUser?: User;
}

export const buildContext = (
  contextExtra: Pick<Context, "req" | "res"> & Partial<Context>
): Context => ({
  assetsBaseUrl: ASSETS_BASE_URL,
  authorsLoader: buildAuthorsLoader(),
  injector: Container,
  connection: Container.get(Connection),
  currentUser: undefined,
  ...contextExtra
});
