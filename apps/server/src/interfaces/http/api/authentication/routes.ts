import { clearAuthCookie } from "@/infra/support/authentication";
import { HttpStatusCodes } from "@/interfaces/http/HttpStatusCodes";
import express from "express";

const router = express.Router();

router.post("/logout", (req, res) => {
  clearAuthCookie(res);
  res.sendStatus(HttpStatusCodes.OK);
});

export { router as auth };
