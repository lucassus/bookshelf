import { RequestHandler } from "express";

import { StatusCodes } from "./StatusCodes";
import {
  getAuthTokenFromRequest,
  tradeAuthTokenForUser
} from "~/infra/support/authentication";

export const authenticationMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const authToken = getAuthTokenFromRequest(req);

  if (!authToken) {
    return res
      .status(StatusCodes.Unauthorized)
      .send("Missing authentication token");
  }

  try {
    req.currentUser = await tradeAuthTokenForUser(authToken);
    return next();
  } catch {
    return res
      .status(StatusCodes.Unauthorized)
      .send("Invalid authentication token");
  }
};

export const adminAuthenticationMiddleware: RequestHandler = (
  req,
  res,
  next
) => {
  const { currentUser } = req;

  if (!currentUser!.isAdmin) {
    return res.sendStatus(StatusCodes.Forbidden);
  }

  return next();
};
