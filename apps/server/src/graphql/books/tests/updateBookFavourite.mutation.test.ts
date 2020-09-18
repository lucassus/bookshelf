import { gql } from "apollo-server-express";
import { getManager } from "typeorm";

import { toExternalId } from "../../../common/secureId";
import { Book } from "../../../database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createBook } from "../../../testUtils/factories";

test("updateBookFavourite mutation", async () => {
  // Given
  const book = await createBook({
    title: "Harry Potter and the Sorcerer's Stone",
    favourite: false
  });

  // When
  const res = await createTestClient().mutate({
    mutation: gql`
      mutation($id: ExternalID!, $favourite: Boolean!) {
        updateBookFavourite(id: $id, favourite: $favourite) {
          __typename

          ... on Book {
            id
            title
            favourite
          }

          ... on MutationError {
            message
          }
        }
      }
    `,
    variables: { id: toExternalId(book), favourite: true }
  });

  // Then
  const updatedBook = await getManager().findOneOrFail(Book, 1);
  expect(updatedBook.favourite).toBe(true);

  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    updateBookFavourite: {
      __typename: "Book",
      id: toExternalId(book),
      title: updatedBook.title,
      favourite: updatedBook.favourite
    }
  });
});
