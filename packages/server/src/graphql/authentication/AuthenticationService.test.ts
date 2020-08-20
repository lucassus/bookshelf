import { Container } from "typedi";

import { createUser } from "../../testUtils/factories";
import { AuthenticationService } from "./AuthenticationService";

describe("AuthenticationService", () => {
  let service: AuthenticationService;

  beforeEach(() => {
    service = Container.get(AuthenticationService);
  });

  describe(".findUserByEmailAndPassword", () => {
    const email = "test@email.com";
    const password = "password";

    beforeEach(() => createUser({ email, password }));

    it("returns a user if valid credentials are given", async () => {
      const user = await service.findUserByEmailAndPassword(email, password);
      expect(user).not.toBe(undefined);
    });

    it("throws an error if invalid credentials are given", async () => {
      await expect(
        service.findUserByEmailAndPassword("invalid@email.com", password)
      ).rejects.toThrow("Invalid email!");

      await expect(
        service.findUserByEmailAndPassword(email, "invalid password")
      ).rejects.toThrow("Invalid password!");
    });
  });
});
