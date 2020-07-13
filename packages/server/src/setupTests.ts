import { Connection } from "typeorm";

import { createConnection } from "./database/createConnection";
import { loadFixtures } from "./fixtures";

let connection: Connection;

beforeEach(async () => {
  connection = await createConnection();
  await connection.dropDatabase();
  await connection.synchronize();
  await loadFixtures();
});

afterEach(() => connection?.close());
