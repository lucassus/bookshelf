import { SecureId } from "./SecureId";

type EntityTypes = "Author" | "Book" | "User";

export const secureId = new SecureId<EntityTypes>({
  separator: "-"
});
