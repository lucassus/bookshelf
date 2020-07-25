import { gql } from "apollo-server-express";

import { createUser } from "../factories";
import { createTestClient } from "../hepers";

test("createUser mutation", async () => {
  // Given
  const currentUser = await createUser({ isAdmin: true });

  // When
  const res = await createTestClient({ currentUser }).mutate({
    mutation: gql`
      mutation($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          name
          info
          avatar {
            image {
              path
            }
            color
          }
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      input: {
        name: "Bob",
        info: "Fantasy lover",
        email: "bob@email.com",
        password: "password",
        avatar: {
          imagePath: "/test/image.jpg",
          color: "red"
        }
      }
    }
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    createUser: {
      id: expect.any(String),
      name: "Bob",
      info: "Fantasy lover",
      avatar: {
        image: { path: "/test/image.jpg" },
        color: "red"
      },
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    }
  });
});
