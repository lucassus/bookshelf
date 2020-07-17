import { SecureId } from "@bookshelf/secure-id";

export const secureId = new SecureId<string>({
  separator: "-"
});
