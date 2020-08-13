import express from "express";

import { serializeUser } from "../serializers";

const router = express.Router();

router.get("/me", async (req, res) => {
  const { currentUser } = req;

  if (!currentUser) {
    return res.sendStatus(401);
  }

  const userJson = await serializeUser(currentUser);
  return res.json(userJson);
});

export { router as auth };
