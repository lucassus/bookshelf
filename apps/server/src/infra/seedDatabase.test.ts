import { getConnection } from "typeorm";

import { Author, Book, BookCopy, Review, User } from "./database/entity";
import { seedDatabase } from "./seedDatabase";

test(".seedDatabase", async () => {
  await seedDatabase();

  const connection = getConnection();
  expect(await connection.getRepository(User).count()).toBe(5);
  expect(await connection.getRepository(Author).count()).toBe(4);
  expect(await connection.getRepository(Book).count()).toBe(24);
  expect(await connection.getRepository(BookCopy).count()).toBe(20);
  expect(await connection.getRepository(Review).count()).toBe(64);
});
