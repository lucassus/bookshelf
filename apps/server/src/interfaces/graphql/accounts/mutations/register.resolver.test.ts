import { gql } from "apollo-server-express";

import { createUser } from "~/infra/factories";
import { createTestClient } from "~/interfaces/graphql/createTestClient";

describe("register mutation", () => {
  const mutation = gql`
    mutation($input: RegistrationInput!) {
      register(input: $input) {
        __typename

        ... on ProtectedUser {
          id
          name
          email
        }

        ... on ValidationErrors {
          errors {
            path
            message
          }
        }
      }
    }
  `;

  test("on success", async () => {
    // When
    const res = await createTestClient().mutate({
      mutation,
      variables: {
        input: { name: "Luke", email: "luke@email.com", password: "password" }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      register: {
        __typename: "ProtectedUser",
        id: expect.any(String),
        name: "Luke",
        email: "luke@email.com"
      }
    });
  });

  it("handles validation errors", async () => {
    // Given
    const user = await createUser({ email: "luke@example.com" });

    // When
    const res = await createTestClient().mutate({
      mutation,
      variables: {
        input: { name: "Luke", email: user.email, password: "password" }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      register: {
        __typename: "ValidationErrors",
        errors: [
          { path: "email", message: "The given email is already taken!" }
        ]
      }
    });
  });
});
