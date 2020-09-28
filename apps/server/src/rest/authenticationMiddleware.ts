import { RequestHandler } from "express";

import {
  getAuthTokenFromRequest,
  tradeAuthTokenForUser
} from "../common/authentication";
import { HttpStatusCodes } from "../http-status-codes";

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const authToken = getAuthTokenFromRequest(req);

  if (authToken) {
    try {
      req.currentUser = await tradeAuthTokenForUser(authToken);
    } catch {
      return res.sendStatus(HttpStatusCodes.Unauthorized);
    }
  }

  return next();
};
