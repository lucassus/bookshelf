import "reflect-metadata";

import { createConnection } from "../src/database/createConnection";
import { loadFixtures } from "../src/testUtils/fixtures";

const seed = async () => {
  const connection = await createConnection();
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
