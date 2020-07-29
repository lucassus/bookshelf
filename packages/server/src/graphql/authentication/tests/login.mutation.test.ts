import { gql } from "apollo-server-express";

import { User } from "../../../database/entity/User";
import { createUser } from "../../../testUtils/factories";
import { createTestClient } from "../../../testUtils/hepers";

describe("login mutation", () => {
  let user: User;
  const validPassword = "secret password";

  beforeEach(async () => {
    user = await createUser({
      email: "user@exmaple.com",
      password: validPassword
    });
  });

  const LoginMutation = gql`
    mutation($input: LoginInput!) {
      login(input: $input) {
        success
        message
        authToken
      }
    }
  `;

  test("login with valid credentials", async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: LoginMutation,
      variables: {
        input: {
          email: user.email,
          password: validPassword
        }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      login: {
        success: true,
        authToken: expect.any(String)
      }
    });
  });

  test("login with invalid email", async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: LoginMutation,
      variables: {
        input: {
          email: "invalid@email.com",
          password: validPassword
        }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      login: {
        success: false,
        message: "Invalid email or password!",
        authToken: null
      }
    });
  });

  test("login with invalid password", async () => {
    // When
    const res = await createTestClient().mutate({
      mutation: LoginMutation,
      variables: {
        input: {
          email: user.email,
          password: "invalid password"
        }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      login: {
        success: false,
        message: "Invalid email or password!",
        authToken: null
      }
    });
  });
});
