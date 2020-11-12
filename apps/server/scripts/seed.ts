import "reflect-metadata";

import { createConnection } from "../src/infra/database/createConnection";
import { seedDatabase } from "../src/infra/seedDatabase";

const seed = async () => {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.synchronize(true);

  await seedDatabase();
};

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
