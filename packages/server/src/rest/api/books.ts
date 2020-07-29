import express from "express";
import { getConnection } from "typeorm/index";

import { Book } from "../../database/entity/Book";

const router = express.Router();

router.get("/", async (req, res) => {
  const connection = getConnection();

  const books = await connection.manager.getRepository(Book).find();
  res.json(books);
});

export { router as books };
