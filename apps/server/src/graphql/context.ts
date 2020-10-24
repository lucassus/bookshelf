import { PubSub } from "apollo-server-express";
import express from "express";
import { ConnectionContext, ExecutionParams } from "subscriptions-transport-ws";
import { Container } from "typedi";
import { Connection } from "typeorm";

import { authenticateRequest } from "../common/authentication";
import { ASSETS_BASE_URL } from "../config";
import { User } from "../database/entity";
import { buildAuthorsLoader } from "./authors/authorsLoader";

// eslint-disable-next-line import/order
import WebSocket = require("ws");

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
    container: Container,
    connection: Container.get(Connection),
    currentUser,
    pubsub,
    req,
    res
  };
};
