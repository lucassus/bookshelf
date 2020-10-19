import express from "express";
import { ExecutionParams } from "subscriptions-transport-ws";
import { Container } from "typedi";
import { Connection } from "typeorm";

import {
  getAuthTokenFromRequest,
  tradeAuthTokenForUser
} from "../common/authentication";
import { ASSETS_BASE_URL } from "../config";
import { User } from "../database/entity";
import { buildAuthorsLoader } from "./authors/authorsLoader";

export interface Context {
  req: express.Request;
  res: express.Response;
  container: typeof Container;
  connection: Connection;
  assetsBaseUrl: string;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUser?: User;
}

export interface AuthenticatedContext extends Context {
  currentUser: User;
}

export const createContext = async ({
  req,
  res,
  connection
}: {
  req: express.Request;
  res: express.Response;
  connection?: ExecutionParams;
}): Promise<Context | AuthenticatedContext> => {
  // TODO: Implement ws authentication
  const authToken = connection ? undefined : getAuthTokenFromRequest(req);

  const currentUser = authToken
    ? await tradeAuthTokenForUser(authToken).catch(() => undefined)
    : undefined;

  return {
    assetsBaseUrl: ASSETS_BASE_URL,
    authorsLoader: buildAuthorsLoader(),
    container: Container,
    connection: Container.get(Connection),
    currentUser,
    req,
    res
  };
};
