import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { User } from "../../database/entity/User";
import { secureId } from "../../database/helpers";
import { createUser } from "../factories";
import { createTestClient } from "../hepers";

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
          id
          name
          info
          createdAt
          updatedAt
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
      id: expect.any(String),
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
