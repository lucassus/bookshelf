import express from "express";
import { getConnection } from "typeorm";

import { authenticateRequest } from "../common/authentication";
import { User } from "../database/entity/User";

export const authenticationMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const userId = authenticateRequest(req);

    const currentUser = userId
      ? await getConnection().manager.findOneOrFail(User, { id: userId })
      : undefined;

    (req as any).user = currentUser;

    next();
  } catch {
    res.sendStatus(401);
  }
};
