import {
  ConnectionOptionsReader,
  createConnection as typeormCreateConnection
} from "typeorm";

const optionsReader = new ConnectionOptionsReader({ root: process.cwd() });

export const createConnection = async () => {
  const options = await optionsReader.get("default");
  return typeormCreateConnection(options);
};
