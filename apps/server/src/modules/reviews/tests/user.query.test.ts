import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { createReview, createUser } from "../../../infra/factories";
import { createTestClient } from "../../../infra/testing/createTestClient";

test("user query", async () => {
  // Given
  const user = await createUser();

  const review1 = await createReview({
    bookAttributes: { title: "Dune" },
    author: user
  });

  const review2 = await createReview({
    bookAttributes: { title: "Blood of Elves" },
    author: user
  });

  // When
  const res = await createTestClient({ currentUser: user }).query({
    query: gql`
      query($id: ExternalID!) {
        user(id: $id) {
          ... on ProtectedUser {
            id
            name
            reviews {
              book {
                title
              }
              text
              rating
            }
          }
        }
      }
    `,
    variables: { id: toExternalId(user) }
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    user: {
      id: toExternalId(user),
      name: user.name,
      reviews: [
        {
          book: { title: "Dune" },
          text: review1.text,
          rating: review1.rating
        },
        {
          book: { title: "Blood of Elves" },
          text: review2.text,
          rating: review2.rating
        }
      ]
    }
  });
});
