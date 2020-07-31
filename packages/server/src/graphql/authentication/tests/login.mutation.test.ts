import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

describe("login mutation", () => {
  const validEmail = "valid@email.com";
  const validPassword = "valid password";

  [
    [validEmail, validPassword, true, "Login success!"],
    ["invalid@email.com", validPassword, false, "Invalid email or password!"],
    [validEmail, "invalid password", false, "Invalid email or password!"]
  ].forEach(([email, password, success, message]) => {
    test(`for ${email} and ${password} responds with ${message}`, async () => {
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
          input: { email, password }
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
    });
  });
});
