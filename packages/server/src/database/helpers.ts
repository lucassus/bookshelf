import { SecureId } from "./SecureId";

type EntityTypes = "Author" | "Book" | "User" | "BookCopy";

export const secureId = new SecureId<EntityTypes>({
  separator: "-"
});
