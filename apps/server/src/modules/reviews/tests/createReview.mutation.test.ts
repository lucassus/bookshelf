import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createBook, createUser } from "../../../testUtils/factories";

test("createReview mutation", async () => {
  // Given
  const user = await createUser();
  const book = await createBook();

  // When
  const resp = await createTestClient({ currentUser: user }).mutate({
    mutation: gql`
      mutation($input: CreateReviewInput!) {
        createReview(input: $input) {
          __typename
          book {
            id
            title
          }
          author {
            id
            name
          }
          rating
          text
        }
      }
    `,
    variables: {
      input: {
        bookId: toExternalId(book),
        rating: 9,
        text: "Great book!"
      }
    }
  });

  // Then
  expect(resp.errors).toBe(undefined);
  expect(resp.data).toMatchObject({
    createReview: {
      __typename: "Review",
      book: {
        id: toExternalId(book),
        title: book.title
      },
      author: {
        id: toExternalId(user),
        name: user.name
      },
      rating: 9,
      text: "Great book!"
    }
  });
});
