import httpMocks from "node-mocks-http";
import { Container } from "typedi";

import { AUTH_COOKIE_NAME } from "../../config";
import { User } from "../../database/entity";
import {
  MutationLoginArgs,
  ResolversTypes
} from "../resolvers-types.generated";
import {
  AuthenticationService,
  InvalidEmailOrPasswordError
} from "./AuthenticationService";
import resolvers from "./resolvers";

const login = resolvers.Mutation!.login! as (
  rootValue: any,
  args: MutationLoginArgs,
  context: any
) => ResolversTypes["LoginResult"];

describe("login authentication resolver", () => {
  test("on login success", async () => {
    // Given
    const fakeUser = new User();
    const authenticationService = Container.get(AuthenticationService);
    jest
      .spyOn(authenticationService, "findUserByEmailAndPasswordOrFail")
      .mockResolvedValue(fakeUser);

    const res = httpMocks.createResponse();

    // When
    const result = await login(
      undefined,
      { input: { email: "example@email.com", password: "password" } },
      { res, container: Container }
    );

    // Then
    expect(
      authenticationService.findUserByEmailAndPasswordOrFail
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
    const authenticationService = Container.get(AuthenticationService);
    jest
      .spyOn(authenticationService, "findUserByEmailAndPasswordOrFail")
      .mockImplementation(() => {
        throw new InvalidEmailOrPasswordError("Invalid password!");
      });

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
