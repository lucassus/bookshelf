import path from "path";
import { createConnection } from "typeorm";

export const createTestConnection = () =>
  createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [path.join(__dirname, "../entity/**/*.ts")],
    synchronize: true,
    logging: false
  });
