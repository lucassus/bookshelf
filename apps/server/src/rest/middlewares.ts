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

  if (!authToken) {
    return res
      .status(HttpStatusCodes.Unauthorized)
      .send("Missing authentication token");
  }

  try {
    req.currentUser = await tradeAuthTokenForUser(authToken);
    return next();
  } catch {
    return res
      .status(HttpStatusCodes.Unauthorized)
      .send("Invalid authentication token");
  }
};

export const adminAuthenticationMiddleware: RequestHandler = (
  req,
  res,
  next
) => {
  const { currentUser } = req;

  if (currentUser.isAdmin) {
    return res.sendStatus(HttpStatusCodes.Forbidden);
  }

  return next();
};
