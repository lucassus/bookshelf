import { Connection } from "typeorm";

import { User } from "../database/entity/User";
import { buildAuthorsLoader } from "../graphql/authors/authorsLoader";

export interface Context {
  assetsBaseUrl: string;
  connection: Connection;
  authorsLoader: ReturnType<typeof buildAuthorsLoader>;
  currentUser?: User;
}
