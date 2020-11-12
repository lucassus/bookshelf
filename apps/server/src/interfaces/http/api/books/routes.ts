import express from "express";
import { Container } from "typedi";

import { BooksService } from "~/infra/services/BooksService";
import { serializeBooks } from "~/interfaces/http/api/serializers";

const router = express.Router();

router.get("/", async (req, res) => {
  const booksService = Container.get(BooksService);
  const books = await booksService.paginate({ take: 10 });

  const booksJson = await serializeBooks(books);
  res.json(booksJson);
});

export { router as books };
