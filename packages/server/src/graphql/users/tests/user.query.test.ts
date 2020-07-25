import { gql } from "apollo-server-express";

import { secureId } from "../../../database/helpers";
import { createBookCopy, createUser } from "../../../testUtils/factories";
import { createTestClient } from "../../../testUtils/hepers";

test("user query", async () => {
  // Given
  const user = await createUser();
  await createBookCopy({ ownerId: user.id });
  await createBookCopy({ ownerId: user.id });
  await createBookCopy({ borrowerId: user.id });

  // When
  const res = await createTestClient().query({
    query: gql`
      query($id: ExternalID!) {
        user(id: $id) {
          name
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
            }
          }
          borrowedBookCopies {
            borrower {
              id
              name
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
  expect(res.errors).toBe(undefined);
  expect(res.data).not.toBeNull();
  expect(res.data!.user).toMatchSnapshot();
});
