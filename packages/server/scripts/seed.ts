import "reflect-metadata";
import { createConnection } from "typeorm";

import ormconfig from "../ormconfig";
import { User } from "../src/entity/User";

createConnection(ormconfig)
  .then(async (connection) => {
    const user = new User();
    user.firstName = "Lukasz";
    user.lastName = "Bandzarewicz";
    user.email = "lucassus@gmail.com";
    await connection.manager.save(user);

    const users = await connection.manager.find(User);
    console.log({ users });

    process.exit(0);
  })
  .catch((error) => console.log(error));
