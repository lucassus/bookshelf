import express from "express";
import { getConnection } from "typeorm";

import { Book } from "../../database/entity/Book";
import { serializeBooks } from "../serializers";

const router = express.Router();

router.get("/", async (req, res) => {
  const connection = getConnection();

  const books = await connection
    .getRepository(Book)
    .createQueryBuilder("books")
    .leftJoinAndSelect("books.author", "author")
    .getMany();

  const booksJson = await serializeBooks(books);
  res.json(booksJson);
});

export { router as books };
