import jwt from "jsonwebtoken";
import httpMocks from "node-mocks-http";
import { getRepository } from "typeorm";

import { AUTH_COOKIE_NAME } from "../config";
import { User } from "../database/entity";
import { createUser } from "../testUtils/factories";
import { authenticateRequest, generateAuthToken } from "./authentication";
import { hashPassword } from "./passwords";

describe(".authenticateRequest", () => {
  describe("when the auth cookie is set", () => {
    const createRequestWithAuthCookie = (token: string) =>
      httpMocks.createRequest({
        cookies: {
          [AUTH_COOKIE_NAME]: token
        }
      });

    it("returns the current user when the token is valid", async () => {
      const user = await createUser();
      const req = createRequestWithAuthCookie(generateAuthToken(user));

      const authUser = await authenticateRequest(req);
      expect(authUser).not.toBe(undefined);
    });

    it("raises an error when the token is invalid", async () => {
      const req = createRequestWithAuthCookie("invalid access token");

      await expect(() => authenticateRequest(req)).rejects.toThrowError(
        "Invalid token payload"
      );
    });

    it("raises an error when the token has an invalid signature", async () => {
      const user = await createUser();
      const req = createRequestWithAuthCookie(
        jwt.sign({ sub: user.id }, "invalid access token secret")
      );

      await expect(() => authenticateRequest(req)).rejects.toThrowError(
        "invalid signature"
      );
    });

    it("raises an error when a user cannot be found", async () => {
      const user = await createUser();
      const req = createRequestWithAuthCookie(generateAuthToken(user));
      await getRepository(User).remove(user);

      await expect(() => authenticateRequest(req)).rejects.toThrow();
    });

    it.each([
      ["test@email.com", "password", "new@email.com", "password"],
      ["test@email.com", "password", "test@email.com", "new password"]
    ])(
      "raises an error when a user has changed email or password",
      async (email, password, newEmail, newPassword) => {
        const user = await createUser({ email, password });
        const req = createRequestWithAuthCookie(generateAuthToken(user));

        user.email = newEmail;
        user.passwordHash = hashPassword(newPassword);
        await getRepository(User).save(user);

        await expect(() => authenticateRequest(req)).rejects.toThrowError(
          "invalid signature"
        );
      }
    );
  });

  describe("when the auth cookie is not set", () => {
    it("returns undefined", async () => {
      await createUser();
      const req = httpMocks.createRequest();

      const authUser = await authenticateRequest(req);
      expect(authUser).toBe(undefined);
    });
  });
});
