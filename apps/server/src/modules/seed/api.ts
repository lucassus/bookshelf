import express from "express";
import { getConnection } from "typeorm";

import {
  Author,
  Avatar,
  Book,
  BookCopy,
  Review,
  User
} from "../../infra/database/entity";
import { HttpStatusCodes } from "../../infra/HttpStatusCodes";
import { seedDatabase } from "../../infra/seedDatabase";

const router = express.Router();

router.post("/", async (req, res) => {
  const connection = getConnection();

  const tables = [Book, Review, BookCopy, Author, User, Avatar].map(
    (entity) => connection.getMetadata(entity).tableName
  );
  tables.push("users_favourite_books");

  await connection.query(`TRUNCATE TABLE ${tables.join(", ")};`);
  await seedDatabase();

  res.sendStatus(HttpStatusCodes.OK);
});

export { router as seed };
