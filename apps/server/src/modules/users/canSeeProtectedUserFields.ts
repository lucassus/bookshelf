import { User } from "../../infra/database/entity";

export function canSeeProtectedUserFields({
  currentUser,
  user
}: {
  currentUser?: User;
  user: User;
}): boolean {
  // Only logged-in user can see protected fields
  if (!currentUser) {
    return false;
  }

  // Only admin or the current user can see protected fields
  return currentUser.isAdmin || currentUser.id === user.id;
}
