import express from "express";

import { clearAuthCookie } from "../../common/authentication";
import { HttpStatusCodes } from "../../http-status-codes";
import { serializeUser } from "../serializers";

const router = express.Router();

router.get("/me", async (req, res) => {
  const { currentUser } = req;

  if (!currentUser) {
    return res.sendStatus(HttpStatusCodes.Forbidden);
  }

  const userJson = await serializeUser(currentUser);
  return res.json(userJson);
});

router.post("/logout", (req, res) => {
  clearAuthCookie(res);
  res.send(HttpStatusCodes.OK);
});

export { router as auth };
