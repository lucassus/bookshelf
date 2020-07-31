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

describe("login mutation", () => {
  test("on login success", async () => {
    // Given
    const user = { id: 123 };
    const userRepository = {
      findByEmailAndPassword: jest.fn().mockResolvedValue(user)
    };
    const connection = {
      getCustomRepository: jest.fn().mockReturnValue(userRepository)
    };

    // When
    const result = await login(
      undefined,
      { input: { email: "example@email.com", password: "password" } },
      { connection }
    );

    // Then
    expect(connection.getCustomRepository).toHaveBeenCalledWith(UserRepository);
    expect(userRepository.findByEmailAndPassword).toHaveBeenCalledWith(
      "example@email.com",
      "password"
    );

    expect(result).toMatchObject({
      success: true,
      message: "Login success!",
      authToken: expect.any(String)
    });
  });

  test("on error error", async () => {
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
      message: "Invalid email or password!",
      authToken: null
    });
  });
});
