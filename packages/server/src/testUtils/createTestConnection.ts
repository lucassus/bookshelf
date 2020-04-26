import { createConnection } from "typeorm";

export const createTestConnection = () =>
  createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: ["src/entity/**/*.ts"],
    synchronize: true,
    logging: false
  });
