import express from "express";

import { authenticateRequest, clearAuthCookie } from "../common/authentication";

export const authenticationMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    req.currentUser = await authenticateRequest(req);
    next();
  } catch (error) {
    // TODO: Is it a good idea?
    clearAuthCookie(res);
    res.status(401).json({ error: error.message });
  }
};
