import "reflect-metadata";
import { createConnection } from "typeorm";

import config from "../ormconfig";
import { Author } from "../src/entity/Author";
import { User } from "../src/entity/User";
import { authorsAndBooksData } from "./seed/authorsAndBooksData";
import { usersData } from "./seed/usersData";

const seed = async () => {
  const connection = await createConnection(config);

  const users = connection.manager.create(User, usersData);
  await connection.manager.save(users);

  const authors = connection.manager.create(Author, authorsAndBooksData);
  await connection.manager.save(authors);
};

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
