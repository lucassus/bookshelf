import { SecureId } from "@bookshelf/secure-id";

type EntityTypes = "Author" | "Book" | "User" | "BookCopy";

export const secureId = new SecureId<EntityTypes>({
  separator: "-"
});
