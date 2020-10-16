import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { Book } from "../../../database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createBook, createUser } from "../../../testUtils/factories";

test("addBookToFavourites mutation", async () => {
  // Given
  const book = await createBook();
  const user = await createUser();

  // When
  const res = await createTestClient({ currentUser: user }).mutate({
    mutation: gql`
      mutation($id: ExternalID!) {
        addBookToFavourites(id: $id) {
          __typename

          ... on Book {
            id
            title
            isFavourite
          }

          ... on ResourceNotFoundError {
            message
          }
        }
      }
    `,
    variables: { id: toExternalId(book) }
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    addBookToFavourites: {
      __typename: "Book",
      id: toExternalId(book),
      title: book.title,
      isFavourite: true
    }
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchObject({
    addBookToFavourites: {
      __typename: "Book",
      id: toExternalId(book),
      title: book.title,
      isFavourite: true
    }
  });
});
