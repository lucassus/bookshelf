import { Connection } from "typeorm";

import { buildAuthorsLoader } from "./database/authorsLoader";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}
