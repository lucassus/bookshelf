import { createConnection as createTypeormConnection } from "typeorm";

import connectionOptions from "./config";

export const createConnection = async () =>
  createTypeormConnection(connectionOptions);
