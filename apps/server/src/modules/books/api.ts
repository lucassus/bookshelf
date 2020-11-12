import express from "express";
import { Container } from "typedi";
import { Connection } from "typeorm";

import { Book } from "../../infra/database/entity";
import { serializeBooks } from "../../infra/serializers";

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Container.get(Connection)
    .getRepository(Book)
    .createQueryBuilder("books")
    .leftJoinAndSelect("books.author", "author")
    .getMany();

  const booksJson = await serializeBooks(books);
  res.json(booksJson);
});

export { router as books };
