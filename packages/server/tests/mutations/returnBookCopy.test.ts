import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { getManager } from "typeorm";

import { BookCopy } from "../../src/database/entity/BookCopy";
import { User } from "../../src/database/entity/User";
import {
  createBook,
  createBookCopy,
  createUser
} from "../../src/database/factories";
import { secureId } from "../../src/database/helpers";
import { createServer } from "../../src/server";

let server: ApolloServer;

let currentUser: User;

beforeEach(async () => {
  currentUser = await createUser({ name: "Bob" });
  server = createServer();
});

test("returnBookCopy mutation", async () => {
  // Given
  const { query } = createTestClient(server);

  const book = await createBook();
  const owner = await createUser({ name: "Alice", email: "alice@email.com" });
  let bookCopy = await createBookCopy({
    bookId: book.id,
    ownerId: owner.id,
    borrowerId: currentUser.id
  });

  // When
  const id = secureId.toExternal(bookCopy.id, "BookCopy");

  const res = await query({
    query: gql`
      mutation ReturnBookCopy($id: ID!) {
        returnBookCopy(id: $id) {
          id
          book {
            id
            title
          }
          owner {
            id
            name
            email
          }
          borrower {
            id
            name
          }
        }
      }
    `,
    variables: { id }
  });

  // Then
  bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
  expect(bookCopy.borrowerId).toBe(null);

  expect(res.data).not.toBe(null);
  expect(res.data).toMatchObject({
    returnBookCopy: {
      id,
      book: {
        id: expect.any(String),
        title: book.title
      },
      owner: {
        id: expect.any(String),
        name: owner.name,
        email: owner.email
      }
    }
  });
});
