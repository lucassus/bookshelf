import "reflect-metadata";

import { createConnection } from "~/infra/database/createConnection";
import { seedDatabase } from "~/infra/seedDatabase";

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
