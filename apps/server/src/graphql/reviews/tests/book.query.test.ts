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
  const review = await createReview({ book, author: user });

  // When
  const resp = await createTestClient().query({
    query: gql`
      query($id: ExternalID!) {
        book(id: $id) {
          ... on Book {
            __typename
            id
            title
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
    variables: {
      id: toExternalId(book)
    }
  });

  // Then
  expect(resp.errors).toBe(undefined);
  expect(resp.data).toMatchObject({
    book: {
      id: toExternalId(book),
      title: book.title,
      reviews: [
        {
          id: toExternalId(review),
          author: {
            id: toExternalId(user),
            name: user.name
          },
          text: review.text,
          rating: review.rating
        }
      ]
    }
  });
});
