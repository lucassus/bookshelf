import express from "express";

import { User } from "../../database/entity";
import { serializeUser } from "../serializers";

const router = express.Router();

router.get("/me", async (req, res) => {
  const { user } = req as { user?: User };

  if (!user) {
    return res.sendStatus(401);
  }

  const userJson = await serializeUser(user);
  return res.json(userJson);
});

export { router as auth };
