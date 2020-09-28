import { sendAuthCookie } from "../../common/authentication";
import { User } from "../../database/entity";
import { Context } from "../context";

// TODO: Find a better name or refactor
export function authenticateContext(context: Context, user: User): void {
  context.currentUser = user;
  sendAuthCookie(context.res, user);
}
