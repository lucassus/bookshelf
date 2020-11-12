import {
  Author,
  Avatar,
  Book,
  BookCopy,
  Review,
  User
} from "@/infra/database/entity";
import { seedDatabase } from "@/infra/seedDatabase";
import { StatusCodes } from "@/interfaces/http/StatusCodes";
import express from "express";
import { getConnection } from "typeorm";

const router = express.Router();

router.post("/", async (req, res) => {
  const connection = getConnection();

  const tables = [Book, Review, BookCopy, Author, User, Avatar].map(
    (entity) => connection.getMetadata(entity).tableName
  );
  tables.push("users_favourite_books");

  await connection.query(`TRUNCATE TABLE ${tables.join(", ")};`);
  await seedDatabase();

  res.sendStatus(StatusCodes.OK);
});

export { router as seed };
