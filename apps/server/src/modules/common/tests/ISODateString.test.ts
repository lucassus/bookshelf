import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createBookCopy, createUser } from "../../../testUtils/factories";

test("ISODateString scalar", async () => {
  // Given
  const user = await createUser();
  await createBookCopy({ owner: user });
  await createBookCopy({
    borrower: user,
    borrowedAt: new Date(Date.UTC(2020, 7, 1, 10, 30))
  });

  // When
  const resp = await createTestClient({ currentUser: user }).query({
    query: gql`
      query($userId: ExternalID!) {
        user(id: $userId) {
          ... on ProtectedUser {
            ownedBookCopies {
              borrowedAt
            }

            borrowedBookCopies {
              borrowedAt
            }
          }
        }
      }
    `,
    variables: {
      userId: toExternalId(user)
    }
  });

  // Then
  expect(resp.errors).toBe(undefined);
  expect(resp.data!.user.ownedBookCopies[0].borrowedAt).toBe(null);
  expect(resp.data!.user.borrowedBookCopies[0].borrowedAt).toBe(
    "2020-08-01T10:30:00.000Z"
  );
});
