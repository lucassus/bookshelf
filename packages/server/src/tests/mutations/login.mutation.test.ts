import { gql } from "apollo-server-express";

import { User } from "../../database/entity/User";
import { createUser } from "../factories";
import { getTestClient } from "../hepers";

describe("login mutation", () => {
  let user: User;

  beforeEach(async () => {
    user = await createUser({
      email: "user@exmaple.com",
      password: "secret password"
    });
  });

  const LoginMutation = gql`
    mutation($input: LoginInput!) {
      login(input: $input) {
        success
        authToken
        message
      }
    }
  `;

  test("login with valid credentials", async () => {
    // When
    const res = await getTestClient().mutate({
      mutation: LoginMutation,
      variables: {
        input: {
          email: user.email,
          password: "secret password"
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

  test("login with invalid credentials", async () => {
    // When
    const res = await getTestClient().mutate({
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
        authToken: null,
        message: "Invalid email or password!"
      }
    });
  });
});
