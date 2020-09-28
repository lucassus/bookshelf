import express from "express";

import {
  getAuthTokenFromRequest,
  tradeAuthTokenForUser
} from "../common/authentication";
import { HttpStatusCodes } from "../http-status-codes";

export const authenticationMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const authToken = getAuthTokenFromRequest(req);

    if (authToken) {
      req.currentUser = await tradeAuthTokenForUser(authToken);
    }

    next();
  } catch (error) {
    res.status(HttpStatusCodes.Unauthenticated).json({ error: error.message });
  }
};
