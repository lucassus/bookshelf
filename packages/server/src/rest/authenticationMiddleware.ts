import { getConnection } from "typeorm";

import { authenticateRequest } from "../common/authentication";
import { User } from "../database/entity/User";

export const authenticationMiddleware = async (
  req: any,
  res: any,
  next: any
) => {
  try {
    const userId = authenticateRequest(req);

    const connection = getConnection();
    const currentUser = userId
      ? await connection.manager.findOneOrFail(User, { id: userId })
      : undefined;

    req.user = currentUser;

    next();
  } catch {
    return res.sendStatus(401);
  }
};
