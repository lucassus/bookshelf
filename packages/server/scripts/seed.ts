import "reflect-metadata";
import { Environment, ENVIRONMENT } from "../src/config";
import {
  createDevelopmentConnection,
  createProductionConnection
} from "../src/database/createConnection";
import { loadFixtures } from "../src/fixtures";

const seed = async () => {
  ENVIRONMENT === Environment.production
    ? await createProductionConnection()
    : await createDevelopmentConnection();

  await loadFixtures();
};

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
