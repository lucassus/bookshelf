import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import {
  createBook,
  createReview,
  createUser
} from "../../../testUtils/factories";

test("book query", async () => {
  // Given
  const book = await createBook({ title: "Dune" });
  const user = await createUser({ name: "Bob" });

  const review1 = await createReview({ book, author: user, rating: 10 });
  const review2 = await createReview({ book, rating: 8 });
  await createReview();

  // When
  const resp = await createTestClient().query({
    query: gql`
      query($id: ExternalID!) {
        book(id: $id) {
          ... on Book {
            __typename
            id
            title
            reviewsCount
            reviews {
              id
              author {
                id
                name
              }
              text
              rating
            }
          }
        }
      }
    `,
    variables: { id: toExternalId(book) }
  });

  // Then
  expect(resp.errors).toBe(undefined);
  expect(resp.data).toMatchObject({
    book: {
      id: toExternalId(book),
      title: book.title,
      reviewsCount: 2,
      reviews: [
        {
          id: toExternalId(review1),
          author: {
            id: toExternalId(user),
            name: user.name
          },
          text: review1.text,
          rating: review1.rating
        },
        {
          text: review2.text,
          rating: review2.rating
        }
      ]
    }
  });
});
