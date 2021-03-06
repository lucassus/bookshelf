import express from "express";

import { serializeUser } from "~/interfaces/http/api/serializers";

const router = express.Router();

router.get("/", async (req, res) => {
  const { currentUser } = req;

  const userJson = await serializeUser(currentUser!);
  return res.json(userJson);
});

export { router as me };
