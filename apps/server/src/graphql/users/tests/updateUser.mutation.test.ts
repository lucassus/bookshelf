import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { toExternalId } from "../../../common/secureId";
import { User } from "../../../infrastucture/database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

describe("updateUser mutation", () => {
  const UpdateUserMutation = gql`
    mutation($input: UpdateUserInput!) {
      updateUser(input: $input) {
        __typename

        ... on User {
          id
          name
          info
          createdAt
          updatedAt
        }

        ... on ResourceNotFoundError {
          message
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
    const currentUser = await createUser({ isAdmin: true });
    const user = await createUser({ name: "Alice", email: "alice@email.com" });

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: UpdateUserMutation,
      variables: {
        input: {
          id: toExternalId(user),
          name: "Bob",
          info: "Fantasy lover",
          email: "bob@email.com"
        }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      updateUser: {
        __typename: "ProtectedUser",
        id: toExternalId(user),
        name: "Bob",
        info: "Fantasy lover",
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    });

    const updatedUser = await getManager().findOneOrFail(User, user.id);
    expect(updatedUser.name).toBe("Bob");
    expect(updatedUser.email).toBe("bob@email.com");
  });

  test("on resource not found error", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: true });

    const user = new User();
    user.id = 123;

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: UpdateUserMutation,
      variables: {
        input: {
          id: toExternalId(user),
          name: "Bob",
          info: "Fantasy lover",
          email: "bob@email.com"
        }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      updateUser: {
        __typename: "ResourceNotFoundError",
        message: "Could not find User"
      }
    });
  });

  test("on validation errors", async () => {
    // Given
    const currentUser = await createUser({
      email: "taken@email.com",
      isAdmin: true
    });
    const user = await createUser();

    // When
    const res = await createTestClient({ currentUser }).mutate({
      mutation: UpdateUserMutation,
      variables: {
        input: {
          id: toExternalId(user),
          name: "Bob",
          info: "Fantasy lover",
          email: currentUser.email
        }
      }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      updateUser: {
        __typename: "ValidationErrors",
        errors: [
          {
            path: "email",
            message: "The given email is already taken!"
          }
        ]
      }
    });
  });
});
