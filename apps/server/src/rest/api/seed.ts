import express from "express";
import { getConnection } from "typeorm";

import { Author, Avatar, Book, BookCopy, User } from "../../database/entity";
import { HttpStatusCodes } from "../../http-status-codes";
import { loadFixtures } from "../../testUtils/fixtures";

const router = express.Router();

router.post("/", async (req, res) => {
  const connection = getConnection();

  const entities = [Book, BookCopy, Author, User, Avatar];
  await connection.query(
    `TRUNCATE TABLE ${entities
      .map((entity) => connection.getMetadata(entity).tableName)
      .join(", ")};`
  );

  await loadFixtures();

  res.sendStatus(HttpStatusCodes.OK);
});

export { router as seed };
