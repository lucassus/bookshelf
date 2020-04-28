import { Connection } from "typeorm";

import { createDatabaseConnection } from "../createDatabaseConnection";
import { loadFixtures } from "./fixtures";

let connection: Connection;

beforeEach(async () => {
  connection = await createDatabaseConnection();
  await connection.dropDatabase();
  await connection.synchronize();
  await loadFixtures();
});

afterEach(() => connection?.close());
