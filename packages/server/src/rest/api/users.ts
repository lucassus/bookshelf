import express from "express";
import { getConnection } from "typeorm";

import { authenticateRequest } from "../../common/authentication";
import { User } from "../../database/entity/User";

const router = express.Router();

// TODO: This route should be protected
router.get("/", async (req, res) => {
  if (!authenticateRequest(req)) {
    return res.send(401);
  }

  const connection = getConnection();
  const users = await connection.getRepository(User).find();

  return res.json(users);
});

export { router as users };
