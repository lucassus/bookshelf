import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { getConnection } from "typeorm";

import { Author } from "../src/database/entity/Author";
import { Book } from "../src/database/entity/Book";
import { secureId } from "../src/database/helpers";
import { loadFixtures } from "../src/fixtures";
import { createServer } from "../src/server";

let server: ApolloServer;

beforeAll(() => {
  server = createServer(getConnection());
});

beforeEach(() => loadFixtures());

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

it("fetches books with authors", async () => {
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
          author {
            id
            name
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
  const book = await getConnection().manager.findOneOrFail(Book, {
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
  const book = await getConnection().manager.findOneOrFail(Book, {
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

it("fetches books along with authors and books again", async () => {
  // Given
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
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
    `
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches a random book", async () => {
  // Given
  const connection = getConnection();

  await connection.createQueryBuilder().delete().from(Book).execute();
  const author = await connection.manager.findOneOrFail(Author, {
    name: "Andrzej Sapkowski"
  });
  await connection.manager.save(Book, {
    authorId: author.id,
    title: "The tower of the swallow",
    coverPath: "/images/book-covers/witcher4.jpg"
  });

  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query {
        randomBook {
          title
          cover {
            url
          }
        }
      }
    `
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data!.randomBook).toMatchSnapshot();
});

it("updates book favourite", async () => {
  // Given
  const book = await getConnection().manager.findOneOrFail(Book, 1);
  expect(book.favourite).toBe(false);

  const { mutate } = createTestClient(server);

  // When
  const res = await mutate({
    mutation: gql`
      mutation UpdateBookFavourite($id: ID!, $favourite: Boolean) {
        updateBookFavourite(id: $id, favourite: $favourite) {
          id
          title
          favourite
        }
      }
    `,
    variables: { id: secureId.toExternal(book.id, "Book"), favourite: true }
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data!.updateBookFavourite).toMatchSnapshot();

  const updatedBook = await getConnection().manager.findOneOrFail(Book, 1);
  expect(updatedBook.favourite).toBe(true);
});
