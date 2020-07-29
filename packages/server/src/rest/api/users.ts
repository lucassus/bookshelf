import express from "express";
import { getConnection } from "typeorm";

import { User } from "../../database/entity/User";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!(req as any).user) {
    return res.sendStatus(401);
  }

  const connection = getConnection();
  const users = await connection.getRepository(User).find();

  return res.json(users);
});

export { router as users };
