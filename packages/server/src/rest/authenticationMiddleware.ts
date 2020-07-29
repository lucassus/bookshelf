import { getConnection } from "typeorm";

import { authenticateRequest } from "../common/authentication";
import { User } from "../database/entity/User";

export const authenticationMiddleware = async (
  req: any,
  res: any,
  next: any
): Promise<void> => {
  try {
    const userId = authenticateRequest(req);

    const currentUser = userId
      ? await getConnection().manager.findOneOrFail(User, { id: userId })
      : undefined;

    req.user = currentUser;

    next();
  } catch {
    res.sendStatus(401);
  }
};
