import { createConnection } from "typeorm";

import connectionOptions from "./ormconfig";

export const createDatabaseConnection = async () =>
  createConnection(connectionOptions);
