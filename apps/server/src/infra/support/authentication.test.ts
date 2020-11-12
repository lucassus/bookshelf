import { AUTH_COOKIE_NAME } from "@/infra/config";
import { User } from "@/infra/database/entity";
import { createUser } from "@/infra/factories";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import httpMocks from "node-mocks-http";
import { getRepository } from "typeorm";

import {
  tradeAuthTokenForUser,
  generateAuthToken,
  getAuthTokenFromRequest
} from "./authentication";
import { hashPassword } from "./passwords";

describe(".getAuthTokenFromRequest", () => {
  it("returns token when a cookie is set", () => {
    const req = httpMocks.createRequest({
      headers: {
        cookie: cookie.serialize(AUTH_COOKIE_NAME, "the token")
      }
    });

    const token = getAuthTokenFromRequest(req);
    expect(token).toBe("the token");
  });

  it("returns undefined when the cookie is not set", () => {
    const req = httpMocks.createRequest();
    const token = getAuthTokenFromRequest(req);
    expect(token).toBe(undefined);
  });
});

describe(".tradeAuthTokenForUser", () => {
  it("returns the current user when the token is valid", async () => {
    const user = await createUser();
    const authToken = generateAuthToken(user);

    const authUser = await tradeAuthTokenForUser(authToken);
    expect(authUser).not.toBe(undefined);
  });

  it("raises an error when the token is invalid", async () => {
    const authToken = "invalid access token";

    await expect(() => tradeAuthTokenForUser(authToken)).rejects.toThrowError(
      "Invalid token payload"
    );
  });

  it("raises an error when the token has an invalid signature", async () => {
    const user = await createUser();
    const authToken = jwt.sign(
      { sub: user.email },
      "invalid access token secret"
    );

    await expect(() => tradeAuthTokenForUser(authToken)).rejects.toThrowError(
      "invalid signature"
    );
  });

  it("raises an error when a user cannot be found", async () => {
    const user = await createUser();
    const authToken = generateAuthToken(user);
    await getRepository(User).remove(user);

    await expect(() => tradeAuthTokenForUser(authToken)).rejects.toThrow();
  });

  it("raises an error when a uses has changed email", async () => {
    const user = await createUser({ email: "foo@email.com" });
    const authToken = generateAuthToken(user);

    user.email = "bar@email.com";
    await getRepository(User).save(user);

    await expect(() => tradeAuthTokenForUser(authToken)).rejects.toThrowError(
      "User not found"
    );
  });

  it("raises an error when a uses has changed password", async () => {
    const user = await createUser({ password: "password" });
    const authToken = generateAuthToken(user);

    user.passwordHash = hashPassword("new password");
    await getRepository(User).save(user);

    await expect(() => tradeAuthTokenForUser(authToken)).rejects.toThrowError(
      "invalid signature"
    );
  });
});
