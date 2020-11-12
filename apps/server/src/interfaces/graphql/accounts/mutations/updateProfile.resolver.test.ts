import { gql } from "apollo-server-express";

import { createUser } from "../../../../infra/factories";
import { toExternalId } from "../../../../infra/support/secureId";
import { createTestClient } from "../../createTestClient";

describe("updateProfile mutation", () => {
  const mutation = gql`
    mutation($input: UpdateProfileInput!) {
      updateProfile(input: $input) {
        __typename

        ... on ProtectedUser {
          id
          name
          email
          info
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
    // Given
    const currentUser = await createUser();

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation,
      variables: {
        input: {
          email: "anna@example.com",
          name: "Anna",
          info: "Foo bar"
        }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      updateProfile: {
        __typename: "ProtectedUser",
        id: toExternalId(currentUser),
        name: "Anna",
        email: "anna@example.com",
        info: "Foo bar"
      }
    });
  });

  test("on error", async () => {
    // Given
    await createUser({ email: "luke@example.com" });
    const currentUser = await createUser({ email: "bob@exmple.com" });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation,
      variables: {
        input: {
          email: "luke@example.com",
          name: currentUser.name,
          info: currentUser.info
        }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      updateProfile: {
        __typename: "ValidationErrors",
        errors: [
          { path: "email", message: "The given email is already taken!" }
        ]
      }
    });
  });
});
