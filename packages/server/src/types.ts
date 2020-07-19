import { Connection } from "typeorm";

import { buildAuthorsLoader } from "./database/authorsLoader";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUserId: number;
}
