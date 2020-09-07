import { gql } from "apollo-server-express";
import httpMocks from "node-mocks-http";

import { AUTH_COOKIE_NAME } from "../../../config";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

describe("login mutation", () => {
  const validEmail = "valid@email.com";
  const validPassword = "valid password";

  const mutation = gql`
    mutation($input: LoginInput!) {
      login(input: $input) {
        __typename

        ... on LoginSuccess {
          currentUser {
            email
          }
        }

        ... on LoginFailure {
          message
        }
      }
    }
  `;

  test("on success", async () => {
    // Given
    const user = await createUser({
      email: validEmail,
      password: validPassword
    });
    const expressRes = httpMocks.createResponse();

    // When
    const res = await createTestClient({ res: expressRes }).mutate({
      mutation,
      variables: {
        input: { email: validEmail, password: validPassword }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      login: {
        __typename: "LoginSuccess",
        currentUser: { email: user.email }
      }
    });

    expect(expressRes.cookies[AUTH_COOKIE_NAME]).not.toBe(undefined);
  });

  [
    ["invalid@email.com", validPassword, "Invalid email or password!"],
    [validEmail, "invalid password", "Invalid email or password!"]
  ].forEach(([email, password, message]) => {
    test(`on error responds with ${message}`, async () => {
      // Given
      await createUser({
        email: validEmail,
        password: validPassword
      });
      const expressRes = httpMocks.createResponse();

      // When
      const res = await createTestClient({ res: expressRes }).mutate({
        mutation,
        variables: {
          input: { email, password }
        }
      });

      // Then
      expect(res.errors).toBe(undefined);
      expect(res.data).toMatchObject({
        login: {
          __typename: "LoginFailure",
          message
        }
      });

      expect(expressRes.cookies[AUTH_COOKIE_NAME]).toBe(undefined);
    });
  });
});
