import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";

import { createBookCopy, createUser } from "../src/database/factories";
import { secureId } from "../src/database/helpers";
import { createServer } from "../src/server";

let server: ApolloServer;

beforeEach(async () => {
  // TODO: Implement a better way for authenticating a user
  await createUser();

  server = createServer();
});

test("borrow book copy", async () => {
  // Given
  const { query } = createTestClient(server);

  const bookCopy = await createBookCopy({
    bookAttributes: {
      title: "Time of contempt"
    },
    ownerAttributes: {
      name: "Bob",
      email: "bob@email.com"
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
  expect(res.data).not.toBeNull();
  expect(res.data!.borrowBookCopy).toMatchSnapshot();
});

test("return book copy", async () => {
  // Given
  const { query } = createTestClient(server);

  const bookCopy = await createBookCopy({
    ownerAttributes: { name: "Bob", email: "bob@email.com" },
    borrowerAttributes: { name: "John", email: "john@email.com" }
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
  expect(res.data).not.toBeNull();
  expect(res.data!.returnBookCopy).toMatchSnapshot();
});
