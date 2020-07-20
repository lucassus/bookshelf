import { gql } from "apollo-server-express";

import { getTestClient } from "../hepers";

test("createUser mutation", async () => {
  // When
  const res = await getTestClient().mutate({
    mutation: gql`
      mutation(
        $name: String!
        $info: String!
        $email: String!
        $avatarColor: String!
        $avatarImagePath: String!
      ) {
        createUser(
          name: $name
          info: $info
          email: $email
          avatarColor: $avatarColor
          avatarImagePath: $avatarImagePath
        ) {
          id
          name
          info
          avatar {
            image {
              path
            }
            color
          }
        }
      }
    `,
    variables: {
      name: "Bob",
      info: "Fantasy lover",
      email: "bob@email.com",
      avatarImagePath: "/test/image.jpg",
      avatarColor: "red"
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
      }
    }
  });
});
