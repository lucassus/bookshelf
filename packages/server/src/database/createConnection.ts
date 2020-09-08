import findUp from "find-up";
import { dirname } from "path";
import {
  ConnectionOptionsReader,
  createConnection as typeormCreateConnection
} from "typeorm";

// TODO: Refactor it
export const createConnection = async () => {
  const path = await findUp("ormconfig.js");
  if (!path) {
    throw new Error("Unable to find ormconfig.js");
  }

  const root = dirname(path);
  const optionsReader = new ConnectionOptionsReader({ root });
  const options = await optionsReader.get("default");

  return typeormCreateConnection(options);
};
