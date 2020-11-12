import { PubSub } from "apollo-server-express";
import express from "express";
import { ConnectionContext, ExecutionParams } from "subscriptions-transport-ws";
import { Container } from "typedi";

import { ASSETS_BASE_URL } from "../infra/config";
import { User } from "../infra/database/entity";
import {
  buildAuthorsLoader,
  buildBooksLoader,
  buildUsersLoader
} from "../infra/dataLoaders";
import { authenticateRequest } from "../infra/support/authentication";

// eslint-disable-next-line import/order
import WebSocket = require("ws");

const pubsub = new PubSub();

export interface Context {
  req: express.Request;
  res: express.Response;
  container: typeof Container;
  assetsBaseUrl: string;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  booksLoader: ReturnType<typeof buildBooksLoader>;
  usersLoader: ReturnType<typeof buildUsersLoader>;
  pubsub: PubSub;
  currentUser?: User;
}

export interface AuthenticatedContext extends Context {
  currentUser: User;
}

export const onSubscriptionConnect = async (
  params: any,
  ws: WebSocket,
  context: ConnectionContext
) => {
  const currentUser = await authenticateRequest(context.request);
  return { currentUser };
};

export const createContext = async ({
  req,
  res,
  connection
}: {
  req: express.Request;
  res: express.Response;
  connection?: ExecutionParams;
}): Promise<Context | AuthenticatedContext> => {
  const currentUser = connection
    ? connection.context.currentUser
    : await authenticateRequest(req);

  return {
    assetsBaseUrl: ASSETS_BASE_URL,
    authorsLoader: buildAuthorsLoader(),
    booksLoader: buildBooksLoader(),
    usersLoader: buildUsersLoader(),
    container: Container,
    currentUser,
    pubsub,
    req,
    res
  };
};
