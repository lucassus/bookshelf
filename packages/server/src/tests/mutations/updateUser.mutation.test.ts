import { gql } from "apollo-server-express";

import { secureId } from "../../database/helpers";
import { createUser } from "../factories";
import { getTestClient } from "../hepers";

test("updateUser mutation", async () => {
  // Given
  const user = await createUser();
  const id = secureId.toExternal(user.id, "User");

  // When
  const res = await getTestClient().mutate({
    mutation: gql`
      mutation($id: ID!, $name: String!, $info: String!, $email: String!) {
        updateUser(id: $id, name: $name, info: $info, email: $email) {
          id
          name
          info
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      id,
      name: "Bob",
      info: "Fantasy lover",
      email: "bob@email.com"
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
});
