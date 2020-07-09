import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { Connection, getConnection } from "typeorm";

import { Author } from "./database/entity/Author";
import { Book } from "./database/entity/Book";
import { BookCopy } from "./database/entity/BookCopy";
import { User } from "./database/entity/User";
import { secureId } from "./database/helpers";
import { createServer } from "./server";

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

it("fetches authors along with books", async () => {
  // Given
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query {
        authors {
          name
          books {
            title
          }
        }
      }
    `
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches an author", async () => {
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query GetAuthor($id: ID!) {
        author(id: $id) {
          id
          name
          bio
          books {
            title
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(1, "Author") }
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
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

it("updates book favourite", async () => {
  // Given
  const book = await connection.manager.findOneOrFail(Book, 1);
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

  const updatedBook = await connection.manager.findOneOrFail(Book, 1);
  expect(updatedBook.favourite).toBe(true);
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
