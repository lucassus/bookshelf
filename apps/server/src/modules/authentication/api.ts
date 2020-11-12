import express from "express";

import { clearAuthCookie } from "../../common/authentication";
import { HttpStatusCodes } from "../../http-status-codes";

const router = express.Router();

router.post("/logout", (req, res) => {
  clearAuthCookie(res);
  res.sendStatus(HttpStatusCodes.OK);
});

export { router as auth };
