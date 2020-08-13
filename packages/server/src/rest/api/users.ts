import express from "express";
import { getConnection } from "typeorm";

import { User } from "../../database/entity";
import { serializeUsers } from "../serializers";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }

  const connection = getConnection();
  const users = await connection.getRepository(User).find();

  const usersJson = serializeUsers(users);
  return res.json(usersJson);
});

export { router as users };
