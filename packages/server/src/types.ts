import { Connection } from "typeorm";

import { buildAuthorsLoader } from "./database/authorsLoader";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUserId: number;
}

export type Resolver<Context> = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface Resolvers<Context> {
  [key: string]: {
    [key: string]: Resolver<Context>;
  };
}
