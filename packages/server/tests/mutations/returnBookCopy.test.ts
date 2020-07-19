import { gql } from "apollo-server-express";
import {
  createTestClient,
  ApolloServerTestClient
} from "apollo-server-testing";
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

let currentUser: User;
let testClient: ApolloServerTestClient;

beforeEach(async () => {
  currentUser = await createUser({ name: "Bob" });
  testClient = createTestClient(createServer());
});

test("returnBookCopy mutation", async () => {
  // Given
  const book = await createBook();
  const owner = await createUser({ name: "Alice", email: "alice@email.com" });
  let bookCopy = await createBookCopy({
    bookId: book.id,
    ownerId: owner.id,
    borrowerId: currentUser.id
  });

  // When
  const id = secureId.toExternal(bookCopy.id, "BookCopy");

  const res = await testClient.mutate({
    mutation: gql`
      mutation($id: ID!) {
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
