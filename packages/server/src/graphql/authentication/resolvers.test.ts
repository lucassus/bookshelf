import httpMocks from "node-mocks-http";

import { AUTH_COOKIE_NAME } from "../../config";
import { UserRepository } from "../../database/repositories/UserRepository";
import {
  MutationLoginArgs,
  ResolversTypes
} from "../resolvers-types.generated";
import resolvers from "./resolvers";

const login = resolvers.Mutation!.login! as (
  rootValue: any,
  args: MutationLoginArgs,
  context: any
) => ResolversTypes["LoginPayload"];

describe("login authentication resolver", () => {
  test("on login success", async () => {
    // Given
    const user = { id: 123 };
    const userRepository = {
      findByEmailAndPassword: jest.fn().mockResolvedValue(user)
    };
    const connection = {
      getCustomRepository: jest.fn().mockReturnValue(userRepository)
    };

    const res = httpMocks.createResponse();

    // When
    const result = await login(
      undefined,
      { input: { email: "example@email.com", password: "password" } },
      { connection, res }
    );

    // Then
    expect(connection.getCustomRepository).toHaveBeenCalledWith(UserRepository);
    expect(userRepository.findByEmailAndPassword).toHaveBeenCalledWith(
      "example@email.com",
      "password"
    );

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
    const user = undefined;
    const connection = {
      getCustomRepository: jest.fn().mockReturnValue({
        findByEmailAndPassword: jest.fn().mockResolvedValue(user)
      })
    };

    // When
    const result = await login(
      undefined,
      { input: { email: "example@email.com", password: "invalid password" } },
      { connection }
    );

    // Then
    expect(result).toMatchObject({
      success: false,
      message: "Invalid email or password!"
    });
  });
});
