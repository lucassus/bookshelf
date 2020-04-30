import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { getConnection } from "typeorm";

import { Author } from "./database/entity/Author";
import { Book } from "./database/entity/Book";
import { createServer } from "./server";

let server: ApolloServer;

beforeEach(async () => {
  const connection = getConnection();
  server = createServer(connection);
});

it("fetches books", async () => {
  // Given
  const { query } = createTestClient(server);

  const BOOKS_QUERY = gql`
    query {
      booksCount
      books {
        id
        title
        cover {
          url
        }
      }
    }
  `;

  // When
  const res = await query({ query: BOOKS_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches authors along with books", async () => {
  // Given
  const { query } = createTestClient(server);

  const AUTHORS_QUERY = gql`
    query {
      authors {
        name
        books {
          title
        }
      }
    }
  `;

  // When
  const res = await query({ query: AUTHORS_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches an author", async () => {
  const { query } = createTestClient(server);

  const AUTHOR_QUERY = gql`
    query {
      author(id: 1) {
        id
        name
        books {
          title
        }
      }
    }
  `;

  // When
  const res = await query({ query: AUTHOR_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches books along with authors and books again", async () => {
  // Given
  const { query } = createTestClient(server);

  const BOOKS_QUERY = gql`
    query {
      books {
        title
        author {
          name
          books {
            title
          }
        }
      }
    }
  `;

  // When
  const res = await query({ query: BOOKS_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches a random book", async () => {
  // Given
  const connection = getConnection();
  await connection.createQueryBuilder().delete().from(Book).execute();
  const author = await connection.manager.findOne(Author, {
    name: "Andrzej Sapkowski"
  });
  await connection.manager.save(Book, {
    authorId: author.id,
    title: "The tower of the swallow",
    coverPath: "/images/book-covers/witcher4.jpg"
  });

  const { query } = createTestClient(server);

  const RANDOM_BOOK_QUERY = gql`
    query {
      randomBook {
        title
        cover {
          url
        }
      }
    }
  `;

  // When
  const res = await query({ query: RANDOM_BOOK_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data!.randomBook).toMatchSnapshot();
});

it("fetches users", async () => {
  const { query } = createTestClient(server);

  const USERS_QUERY = gql`
    query {
      users {
        name
        email
        avatar {
          color
          image {
            url
          }
        }
      }
    }
  `;

  // When
  const res = await query({ query: USERS_QUERY });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data!.users).toMatchSnapshot();
});
