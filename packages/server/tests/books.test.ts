import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { Connection, getConnection } from "typeorm";

import { Book } from "../src/database/entity/Book";
import { secureId } from "../src/database/helpers";
import { createServer } from "../src/server";

let connection: Connection;
let server: ApolloServer;

beforeEach(async () => {
  connection = getConnection();
  server = createServer(connection);
});

it("fetches books", async () => {
  // Given
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query {
        booksCount
        books {
          id
          title
          cover {
            url
          }
          copies {
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
      }
    `
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches a book", async () => {
  // Given
  const { query } = createTestClient(server);
  const book = await connection.manager.findOneOrFail(Book, {
    title: "Blood of Elves"
  });

  // When
  const res = await query({
    query: gql`
      query GetBook($id: ID!) {
        book(id: $id) {
          id
          title
          description
          copies {
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
      }
    `,
    variables: { id: secureId.toExternal(book.id, "Book") }
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches a book 2", async () => {
  // Given
  const { query } = createTestClient(server);
  const book = await connection.manager.findOneOrFail(Book, {
    title: "The lady of the lake"
  });

  // When
  const res = await query({
    query: gql`
      query GetBook($id: ID!) {
        book(id: $id) {
          id
          title
          description
          copies {
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
      }
    `,
    variables: { id: secureId.toExternal(book.id, "Book") }
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("responds with error when book cannot be found", async () => {
  // Given
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query GetBook($id: ID!) {
        book(id: $id) {
          id
          title
        }
      }
    `,
    variables: { id: secureId.toExternal(200, "Book") }
  });

  // Then
  expect(res.data).toBe(null);
  expect(res.errors![0].message).toEqual(
    'Could not find any entity of type "Book" matching: "200"'
  );
});
