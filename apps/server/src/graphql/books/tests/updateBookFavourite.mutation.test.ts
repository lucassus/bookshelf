import { gql } from "apollo-server-express";
import { getConnection, getManager } from "typeorm";

import { toExternalId } from "../../../common/secureId";
import { Book } from "../../../database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createBook, createUser } from "../../../testUtils/factories";

describe("updateBookFavourite mutation", () => {
  const mutation = gql`
    mutation($id: ExternalID!, $favourite: Boolean!) {
      updateBookFavourite(id: $id, favourite: $favourite) {
        __typename

        ... on Book {
          id
          title
          isFavourite
        }

        ... on MutationError {
          message
        }
      }
    }
  `;

  it("adds a book to favourites", async () => {
    // Given
    const book = await createBook();
    const user = await createUser();

    // When
    const res = await createTestClient({ currentUser: user }).mutate({
      mutation,
      variables: { id: toExternalId(book), favourite: true }
    });

    // Then
    const updatedBook = await getManager().findOneOrFail(Book, 1);

    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      updateBookFavourite: {
        __typename: "Book",
        id: toExternalId(book),
        title: updatedBook.title,
        isFavourite: true
      }
    });
  });

  it("removes a book to favourites", async () => {
    // Given
    const book = await createBook();

    const user = await createUser();
    user.favouriteBooks = Promise.resolve([book]);
    await getConnection().manager.save(user);

    // When
    const res = await createTestClient({ currentUser: user }).mutate({
      mutation,
      variables: { id: toExternalId(book), favourite: false }
    });

    // Then
    const updatedBook = await getManager().findOneOrFail(Book, 1);

    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      updateBookFavourite: {
        __typename: "Book",
        id: toExternalId(book),
        title: updatedBook.title,
        isFavourite: false
      }
    });
  });

  it("returns an error when not authenticated", async () => {
    // Given
    const book = await createBook();

    // When
    const res = await createTestClient().mutate({
      mutation,
      variables: { id: toExternalId(book), favourite: false }
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors![0];
    expect(error.message).toBe("Unauthorized access! Please log in.");
    expect(error.extensions!.code).toBe("UNAUTHENTICATED");
  });
});
