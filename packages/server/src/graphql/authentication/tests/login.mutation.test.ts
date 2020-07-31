import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

describe("login mutation", () => {
  const validEmail = "valid@email.com";
  const validPassword = "valid password";

  test.each([
    [{ email: validEmail, password: validPassword }, true, "Login success!"],
    [
      { email: "invalid@email.com", password: validPassword },
      false,
      "Invalid email or password!"
    ],
    [
      { email: validEmail, password: "invalid password" },
      false,
      "Invalid email or password!"
    ]
  ])(
    "for %o responds with success: %s and message: %s",
    async (input, success, message) => {
      // Given
      await createUser({ email: validEmail, password: validPassword });

      // When
      const res = await createTestClient().mutate({
        mutation: gql`
          mutation($input: LoginInput!) {
            login(input: $input) {
              success
              message
              authToken
            }
          }
        `,
        variables: {
          input
        }
      });

      // Then
      expect(res.errors).toBe(undefined);
      expect(res.data).toMatchObject({
        login: {
          success,
          message,
          authToken: success ? expect.any(String) : null
        }
      });
    }
  );
});
