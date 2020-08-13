import { getCustomRepository } from "typeorm";

import { createUser } from "../../testUtils/factories";
import { UserRepository } from "./UserRepository";

describe("UserRepository", () => {
  let repository: UserRepository;

  beforeEach(() => {
    repository = getCustomRepository(UserRepository);
  });

  describe(".findByEmailAndPassword", () => {
    const email = "test@email.com";
    const password = "password";

    beforeEach(() => createUser({ email, password }));

    it("returns a user if valid credentials are given", async () => {
      const user = await repository.findByEmailAndPassword(email, password);
      expect(user).not.toBe(undefined);
    });

    it("return undefined if invalid credentials are given", async () => {
      let user = await repository.findByEmailAndPassword(
        "invalid@email.com",
        password
      );
      expect(user).toBe(undefined);

      user = await repository.findByEmailAndPassword(email, "invalid password");
      expect(user).toBe(undefined);
    });
  });
});
