import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { secureId } from "../../../common/secureId";
import { User } from "../../../database/entity/User";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

test("updateUser mutation", async () => {
  // Given
  const currentUser = await createUser({ isAdmin: true });
  const user = await createUser({ name: "Alice", email: "alice@email.com" });
  const id = secureId.toExternal(user.id, "User");

  // When
  const res = await createTestClient({ currentUser }).mutate({
    mutation: gql`
      mutation($input: UpdateUserInput!) {
        updateUser(input: $input) {
          success
          message
          user {
            id
            name
            info
            createdAt
            updatedAt
          }
        }
      }
    `,
    variables: {
      input: {
        id,
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
      success: true,
      message: "User was successfully updated.",
      user: {
        id,
        name: "Bob",
        info: "Fantasy lover",
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    }
  });

  const updatedUser = await getManager().findOneOrFail(User, user.id);
  expect(updatedUser.name).toBe("Bob");
  expect(updatedUser.email).toBe("bob@email.com");
});
