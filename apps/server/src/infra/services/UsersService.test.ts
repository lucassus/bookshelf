import { createUser } from "@/infra/factories";
import { Container } from "typedi";

import { UsersService } from "./UsersService";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(() => {
    service = Container.get(UsersService);
  });

  describe(".checkUniquenessOfEmail", () => {
    test("when creating a user", async () => {
      await createUser({ email: "anna@example.com" });

      await expect(
        service.checkUniquenessOfEmail("john@example.com")
      ).resolves.toBe(true);

      await expect(
        service.checkUniquenessOfEmail("anna@example.com")
      ).resolves.toBe(false);
    });

    test("when updating a user", async () => {
      // Given
      await createUser({ email: "anna@example.com" });
      const user = await createUser({ email: "bob@example.com" });

      await expect(
        service.checkUniquenessOfEmail("bob@example.com", user)
      ).resolves.toBe(true);

      await expect(
        service.checkUniquenessOfEmail("john@example.com", user)
      ).resolves.toBe(true);

      await expect(
        service.checkUniquenessOfEmail("anna@example.com", user)
      ).resolves.toBe(false);
    });
  });
});
