import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { getManager } from "typeorm";

import { BookCopy } from "../src/database/entity/BookCopy";
import { User } from "../src/database/entity/User";
import { createBookCopy, createUser } from "../src/database/factories";
import { secureId } from "../src/database/helpers";
import { createServer } from "../src/server";

let server: ApolloServer;

let currentUser: User;

beforeEach(async () => {
  // TODO: Implement a better way for authenticating a user
  currentUser = await createUser({ name: "Bob" });

  server = createServer();
});

test("borrow book copy", async () => {
  // Given
  const { query } = createTestClient(server);

  let bookCopy = await createBookCopy({
    bookAttributes: {
      title: "Time of contempt"
    },
    ownerAttributes: {
      name: "Alice",
      email: "alice@email.com"
    }
  });

  // When
  const res = await query({
    query: gql`
      mutation BorrowBookCopy($id: ID!) {
        borrowBookCopy(id: $id) {
          id
          book {
            id
            title
          }
          owner {
            id
            name
          }
          borrower {
            id
            name
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(bookCopy.id, "BookCopy") }
  });

  // Then
  bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
  expect(bookCopy.borrowerId).toBe(currentUser.id);

  expect(res.data).not.toBeNull();
  expect(res.data!.borrowBookCopy).toMatchSnapshot();
});

test("return book copy", async () => {
  // Given
  const { query } = createTestClient(server);

  let bookCopy = await createBookCopy({
    ownerAttributes: { name: "Alice", email: "alice@email.com" },
    borrowerId: currentUser.id
  });

  // When
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
    variables: { id: secureId.toExternal(bookCopy.id, "BookCopy") }
  });

  // Then
  bookCopy = await getManager().findOneOrFail(BookCopy, bookCopy.id);
  expect(bookCopy.borrowerId).toBe(null);

  expect(res.data).not.toBeNull();
  expect(res.data!.returnBookCopy).toMatchSnapshot();
});
