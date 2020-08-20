import httpMocks from "node-mocks-http";
import { Container } from "typedi";

import { AUTH_COOKIE_NAME } from "../../config";
import { User } from "../../database/entity";
import {
  MutationLoginArgs,
  ResolversTypes
} from "../resolvers-types.generated";
import { AuthenticationService } from "./AuthenticationService";
import resolvers from "./resolvers";

const login = resolvers.Mutation!.login! as (
  rootValue: any,
  args: MutationLoginArgs,
  context: any
) => ResolversTypes["LoginPayload"];

describe("login authentication resolver", () => {
  test("on login success", async () => {
    // Given
    const fakeUser: Partial<User> = { id: 123 };
    const fakeAuthenticationService: Partial<AuthenticationService> = {
      findUserByEmailAndPasswordOrFail: jest.fn().mockResolvedValue(fakeUser)
    };
    Container.set(AuthenticationService, fakeAuthenticationService);

    const res = httpMocks.createResponse();

    // When
    const result = await login(
      undefined,
      { input: { email: "example@email.com", password: "password" } },
      { res, container: Container }
    );

    // Then
    expect(
      fakeAuthenticationService.findUserByEmailAndPasswordOrFail
    ).toHaveBeenCalledWith("example@email.com", "password");

    expect(res.cookies).toMatchObject({
      [AUTH_COOKIE_NAME]: {
        value: expect.any(String)
      }
    });

    expect(result).toMatchObject({
      success: true,
      message: "Login success!",
      currentUser: expect.any(Object)
    });
  });

  test("on login error", async () => {
    // Given
    const fakeAuthenticationService: Partial<AuthenticationService> = {
      findUserByEmailAndPasswordOrFail: jest.fn().mockImplementation(() => {
        throw new Error("Invalid password!");
      })
    };
    Container.set(AuthenticationService, fakeAuthenticationService);

    // When
    const result = await login(
      undefined,
      { input: { email: "example@email.com", password: "invalid password" } },
      { container: Container }
    );

    // Then
    expect(result).toMatchObject({
      success: false,
      message: "Invalid email or password!"
    });
  });
});
