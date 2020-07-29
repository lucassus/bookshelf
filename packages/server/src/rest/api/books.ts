import express from "express";
import { getConnection } from "typeorm";

import { Book } from "../../database/entity/Book";

const router = express.Router();

router.get("/", async (req, res) => {
  const connection = getConnection();

  const books = await connection
    .getRepository(Book)
    .createQueryBuilder("books")
    .leftJoinAndSelect("books.author", "author")
    .getMany();

  // TODO: Naive serialization, find a better solution
  const json = await Promise.all(
    books.map(async (book) => ({
      id: book.id,
      title: book.title,
      author: {
        id: (await book.author).id,
        name: (await book.author).name
      }
    }))
  );

  res.json(json);
});

export { router as books };
