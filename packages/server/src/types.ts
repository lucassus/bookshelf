import { Connection } from "typeorm";

import { buildAuthorsLoader } from "./database/authorsLoader";
import { User } from "./database/entity/User";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUser: null | User;
}
