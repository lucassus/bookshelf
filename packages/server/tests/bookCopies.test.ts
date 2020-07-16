import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { getConnection } from "typeorm";

import { Book } from "../src/database/entity/Book";
import { secureId } from "../src/database/helpers";
import { loadFixtures } from "../src/fixtures";
import { createServer } from "../src/server";

let server: ApolloServer;

beforeAll(() => {
  server = createServer(getConnection());
});

beforeEach(() => loadFixtures());

test("borrow book copy", async () => {
  // Given
  const { query } = createTestClient(server);

  // TODO: Find a better way for managing fixtures
  const bookCopies = await getConnection()
    .manager.findOneOrFail(Book, {
      title: "The lady of the lake"
    })
    .then((book) => book.copies);

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
          borrower {
            id
            name
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(bookCopies[0].id, "BookCopy") }
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data!.borrowBookCopy).toMatchSnapshot();
});
