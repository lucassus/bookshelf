import express from "express";

import { clearAuthCookie } from "../../../../infra/support/authentication";
import { HttpStatusCodes } from "../../HttpStatusCodes";

const router = express.Router();

router.post("/logout", (req, res) => {
  clearAuthCookie(res);
  res.sendStatus(HttpStatusCodes.OK);
});

export { router as auth };
