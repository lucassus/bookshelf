import { gql } from "apollo-server-express";

import { createUser } from "../factories";
import { getTestClient } from "../hepers";

test("users query", async () => {
  // Given
  await createUser();
  await createUser();
  await createUser();

  // When
  const res = await getTestClient().query({
    query: gql`
      query {
        users {
          name
          info
          avatar {
            image {
              path
              url
            }
            color
          }
        }
      }
    `
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).not.toBe(null);
  expect(res.data!.users).toMatchSnapshot();
});
