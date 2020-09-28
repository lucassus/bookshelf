import express from "express";
import { Container } from "typedi";

import { UsersService } from "../../graphql/users/UsersService";
import { HttpStatusCodes } from "../../http-status-codes";
import { serializeUsers } from "../serializers";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.currentUser) {
    return res.sendStatus(HttpStatusCodes.Forbidden);
  }

  const users = await Container.get(UsersService).findAll();

  const usersJson = serializeUsers(users);
  return res.json(usersJson);
});

export { router as users };
