import { gql } from "apollo-server-express";

import { secureId } from "../../database/helpers";
import { createBookCopy, createUser } from "../factories";
import { getTestClient } from "../hepers";

test("user query", async () => {
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
