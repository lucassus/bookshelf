import { Connection, getConnection } from "typeorm";

import { ASSETS_BASE_URL } from "../config";
import { User } from "../database/entity";
import { buildAuthorsLoader } from "./authors/authorsLoader";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUser?: User;
}

export const buildContext = (contextExtra: Partial<Context>): Context => ({
  assetsBaseUrl: ASSETS_BASE_URL,
  authorsLoader: buildAuthorsLoader(),
  connection: getConnection(),
  currentUser: undefined,
  ...contextExtra
});
