import { clearAuthCookie } from "@/infra/support/authentication";
import { StatusCodes } from "@/interfaces/http/StatusCodes";
import express from "express";

const router = express.Router();

router.post("/logout", (req, res) => {
  clearAuthCookie(res);
  res.sendStatus(StatusCodes.OK);
});

export { router as auth };
