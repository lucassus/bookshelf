import express from "express";

import { HttpStatusCodes } from "../../infra/HttpStatusCodes";
import { clearAuthCookie } from "../../infra/support/authentication";

const router = express.Router();

router.post("/logout", (req, res) => {
  clearAuthCookie(res);
  res.sendStatus(HttpStatusCodes.OK);
});

export { router as auth };
