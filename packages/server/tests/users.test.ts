import { gql } from "apollo-server-express";

import { secureId } from "../src/database/helpers";
import { createBookCopy, createUser } from "../src/tests/factories";
import { getTestClient } from "../src/tests/hepers";

it("fetches users", async () => {
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
          email
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

it("fetches a user", async () => {
  // Given
  const user = await createUser();
  await createBookCopy({ ownerId: user.id });
  await createBookCopy({ ownerId: user.id });
  await createBookCopy({ borrowerId: user.id });

  // When
  const res = await getTestClient().query({
    query: gql`
      query($id: ID!) {
        user(id: $id) {
          name
          email
          info
          avatar {
            color
            image {
              url
            }
          }
          ownedBookCopies {
            book {
              id
              title
            }
            owner {
              id
              name
              email
            }
          }
          borrowedBookCopies {
            borrower {
              id
              name
              email
            }
            book {
              id
              title
            }
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(user.id, "User") }
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data!.user).toMatchSnapshot();
});
