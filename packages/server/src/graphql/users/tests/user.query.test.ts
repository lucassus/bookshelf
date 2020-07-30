import { gql } from "apollo-server-express";

import { secureId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createBookCopy, createUser } from "../../../testUtils/factories";

test("user query", async () => {
  // Given
  const user = await createUser();
  await createBookCopy({ owner: user });
  await createBookCopy({ owner: user });
  await createBookCopy({ borrower: user });

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
