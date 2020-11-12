import { gql } from "apollo-server-express";

import { createUser } from "../../../infra/factories";
import { createTestClient } from "../../../testUtils/createTestClient";

test("users query", async () => {
  // Given
  const userLuke = await createUser({ name: "Luke" });
  const userBob = await createUser({ name: "Bob" });
  const userAlice = await createUser({ name: "Alice" });

  // When
  const res = await createTestClient().query({
    query: gql`
      query {
        users {
          id
          name
          info
          avatar {
            ... on Avatar {
              image {
                path
                url
              }
              color
            }
          }
        }
      }
    `
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).not.toBe(null);
  expect(res.data).toMatchObject({
    users: [
      {
        id: expect.any(String),
        name: userAlice.name,
        info: userAlice.info
      },
      {
        id: expect.any(String),
        name: userBob.name,
        info: userBob.info
      },
      {
        id: expect.any(String),
        name: userLuke.name,
        info: userLuke.info
      }
    ]
  });
});
