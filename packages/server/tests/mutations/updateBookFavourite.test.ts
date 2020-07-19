import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { getManager } from "typeorm";

import { Book } from "../../src/database/entity/Book";
import { createBook } from "../../src/database/factories";
import { secureId } from "../../src/database/helpers";
import { createServer } from "../../src/server";

let server: ApolloServer;

beforeEach(async () => {
  server = createServer();
});

it("updateBookFavourite mutation", async () => {
  // Given
  const { mutate } = createTestClient(server);

  const book = await createBook({
    title: "Harry Potter and the Sorcerer's Stone",
    favourite: false
  });

  // When
  const id = secureId.toExternal(book.id, "Book");

  const res = await mutate({
    mutation: gql`
      mutation($id: ID!, $favourite: Boolean!) {
        updateBookFavourite(id: $id, favourite: $favourite) {
          id
          title
          favourite
        }
      }
    `,
    variables: { id, favourite: true }
  });

  // Then
  const updatedBook = await getManager().findOneOrFail(Book, 1);
  expect(updatedBook.favourite).toBe(true);

  expect(res.data).not.toBe(null);
  expect(res.data).toMatchObject({
    updateBookFavourite: {
      id,
      title: updatedBook.title,
      favourite: updatedBook.favourite
    }
  });
});
