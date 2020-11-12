import { sendAuthCookie } from "../../common/authentication";
import { User } from "../../infra/database/entity";
import { Context } from "../context";

export function authenticateContext(context: Context, user: User): void {
  context.currentUser = user;
  sendAuthCookie(context.res, user);
}
