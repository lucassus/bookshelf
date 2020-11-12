import express from "express";
import { Container } from "typedi";

import { UsersService } from "../../../../infra/services/UsersService";
import { serializeUsers } from "../serializers";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await Container.get(UsersService).findAll();

  const usersJson = serializeUsers(users);
  return res.json(usersJson);
});

export { router as users };
