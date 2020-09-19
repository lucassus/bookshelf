import { sendAuthCookie } from "../../common/authentication";
import { Context } from "../context";

export function authenticateContext(context: Context, user) {
  context.currentUser = user;
  sendAuthCookie(context.res, user);
}
