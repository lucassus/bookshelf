import { User } from "@/infra/database/entity";
import { sendAuthCookie } from "@/infra/support/authentication";
import { Context } from "@/interfaces/graphql/context";

export function authenticateContext(context: Context, user: User): void {
  context.currentUser = user;
  sendAuthCookie(context.res, user);
}
