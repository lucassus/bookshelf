import path from "path";
import { Connection, createConnection } from "typeorm";

import { loadFixtures } from "./fixtures";

let connection: Connection;

beforeEach(async () => {
  connection = await createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [path.join(__dirname, "../entity/**/*.ts")],
    synchronize: true,
    logging: false
  });

  await loadFixtures();
});

afterEach(() => connection?.close());
