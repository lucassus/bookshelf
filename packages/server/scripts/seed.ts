import "reflect-metadata";

import { createDatabaseConnection } from "../src/createDatabaseConnection";
import { loadFixtures } from "../src/testUtils/fixtures";

const seed = async () => {
  const connection = await createDatabaseConnection();
  await connection.dropDatabase();
  await connection.synchronize(true);
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
