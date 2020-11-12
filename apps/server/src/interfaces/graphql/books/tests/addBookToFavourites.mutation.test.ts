import { gql } from "apollo-server-express";

import { createBook, createUser } from "../../../../infra/factories";
import { toExternalId } from "../../../../infra/support/secureId";
import { createTestClient } from "../../createTestClient";

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
