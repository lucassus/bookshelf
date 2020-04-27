import { ConnectionOptionsReader, createConnection } from "typeorm";

const connectionOptionsReader = new ConnectionOptionsReader({
  root: process.cwd()
});

export const createDatabaseConnection = async () => {
  const connectionOptions = await connectionOptionsReader.get("default");

  return createConnection({
    ...connectionOptions,
    entities: ["./src/entity/**/*.ts"]
  });
};
