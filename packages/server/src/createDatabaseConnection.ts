import { createConnection } from "typeorm";

import connectionOptions from "./database/config";

export const createDatabaseConnection = async () =>
  createConnection(connectionOptions);
