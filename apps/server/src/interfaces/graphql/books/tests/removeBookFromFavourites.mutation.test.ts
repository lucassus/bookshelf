import { gql } from "apollo-server-express";
import { getConnection } from "typeorm";

import { createBook, createUser } from "~/infra/factories";
import { toExternalId } from "~/infra/support/secureId";
import { createTestClient } from "~/interfaces/graphql/createTestClient";

test("removeBookFromFavourites mutation", async () => {
  // Given
  const book = await createBook();

  const user = await createUser();
  user.favouriteBooks = Promise.resolve([book]);
  await getConnection().manager.save(user);

  // When
  const res = await createTestClient({ currentUser: user }).mutate({
    mutation: gql`
      mutation($id: ExternalID!) {
        removeBookFromFavourites(id: $id) {
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
    removeBookFromFavourites: {
      __typename: "Book",
      id: toExternalId(book),
      title: book.title,
      isFavourite: false
    }
  });
});
