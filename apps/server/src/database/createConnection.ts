import path from "path";
import {
  ConnectionOptionsReader,
  createConnection as typeormCreateConnection
} from "typeorm";

const optionsReader = new ConnectionOptionsReader({
  root: path.join(__dirname, "..", "..")
});

export const createConnection = async () => {
  const options = await optionsReader.get("default");
  return typeormCreateConnection(options);
};
