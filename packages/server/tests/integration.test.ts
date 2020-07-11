import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { Connection, getConnection } from "typeorm";

import { Author } from "../src/database/entity/Author";
import { Book } from "../src/database/entity/Book";
import { BookCopy } from "../src/database/entity/BookCopy";
import { User } from "../src/database/entity/User";
import { secureId } from "../src/database/helpers";
import { createServer } from "../src/server";

let connection: Connection;
let server: ApolloServer;

beforeEach(async () => {
  connection = getConnection();
  server = createServer(connection);
});

it("fetches users", async () => {
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query {
        users {
          name
          email
          info
          avatar {
            color
            image {
              url
            }
          }
        }
      }
    `
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data!.users).toMatchSnapshot();
});

it("fetches a user", async () => {
  const { query } = createTestClient(server);
  const user = await connection.manager.findOneOrFail(User, { name: "Bob" });

  // When
  const res = await query({
    query: gql`
      query GetUser($id: ID!) {
        user(id: $id) {
          name
          email
          info
          avatar {
            color
            image {
              url
            }
          }
          ownedBookCopies {
            book {
              id
              title
            }
          }
          borrowedBookCopies {
            borrower {
              id
              name
              email
            }
            book {
              id
              title
            }
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(user.id, "User") }
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data!.user).toMatchSnapshot();
});

describe("fetching anything", () => {
  const GetAnythingQuery = gql`
    query GetAnything($id: ID!) {
      anything(id: $id) {
        __typename

        ... on Author {
          id
          name
          books {
            ...BookFragment
          }
        }

        ...BookFragment

        ...UserFragment

        ... on BookCopy {
          id
          owner {
            ...UserFragment
          }
          borrower {
            ...UserFragment
          }
          book {
            ...BookFragment
          }
        }
      }
    }

    fragment BookFragment on Book {
      id
      title
      description
      favourite
    }

    fragment UserFragment on User {
      id
      name
      email
    }
  `;

  it("fetches Author", async () => {
    // Given
    const { query } = createTestClient(server);

    // When
    const res = await query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(1, "Author") }
    });

    // Then
    expect(res.data!.anything).toMatchSnapshot();
  });

  it("fetches Book", async () => {
    // Given
    const { query } = createTestClient(server);

    // When
    const res = await query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(2, "Book") }
    });

    // Then
    expect(res.data!.anything).toMatchSnapshot();
  });

  it("fetches User", async () => {
    // Given
    const { query } = createTestClient(server);

    // When
    const res = await query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(1, "User") }
    });

    // Then
    expect(res.data!.anything).toMatchSnapshot();
  });

  it("fetches BookCopy", async () => {
    // Given
    const { query } = createTestClient(server);
    const bookCopy = await connection.manager.findOne(BookCopy, {
      order: { id: "ASC" }
    });

    // When
    const res = await query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(bookCopy!.id, "BookCopy") }
    });

    // Then
    expect(res.data!.anything).toMatchSnapshot();
  });
});

it("fetches with aliases", async () => {
  // Given
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query {
        something: book(id: "${secureId.toExternal(1, "Book")}") {
          id
          externalId: id
          headline: title
          description
        }
        
        author(id: "${secureId.toExternal(1, "Author")}") {
          id
          headline: name
          description: bio
        }
        
        user(id: "${secureId.toExternal(1, "User")}") {
          id
          headline: name
          description: info
        }
      }
    `
  });

  // Then
  expect(res.data).toMatchSnapshot();
});
