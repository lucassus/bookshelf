import { PubSub } from "apollo-server-express";
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

const pubsub = new PubSub();

export interface Context {
  req: express.Request;
  res: express.Response;
  container: typeof Container;
  connection: Connection;
  assetsBaseUrl: string;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  pubsub: PubSub;
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
  // TODO: Refactor it
  // TODO: Create a separate context for ws
  let currentUser;

  if (connection) {
    currentUser = connection.context.currentUser;
  } else {
    const authToken = getAuthTokenFromRequest(req);

    currentUser = authToken
      ? await tradeAuthTokenForUser(authToken).catch(() => undefined)
      : undefined;
  }

  return {
    assetsBaseUrl: ASSETS_BASE_URL,
    authorsLoader: buildAuthorsLoader(),
    container: Container,
    connection: Container.get(Connection),
    currentUser,
    pubsub,
    req,
    res
  };
};
