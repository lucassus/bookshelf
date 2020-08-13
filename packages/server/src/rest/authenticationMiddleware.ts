import express from "express";

import { authenticateRequest } from "../common/authentication";

export const authenticationMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const currentUser = await authenticateRequest(req);

    // TODO: Provide better typings
    (req as any).user = currentUser;

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
