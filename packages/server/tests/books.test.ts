import { gql } from "apollo-server-express";

import { secureId } from "../src/database/helpers";
import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "../src/tests/factories";
import { getTestClient } from "../src/tests/hepers";

it("fetches books", async () => {
  // Given
  const book = await createBook({ title: "Hobbit" });
  await createBookCopy({ bookId: book.id, ownerAttributes: { name: "John" } });
  const borrower = await createUser({ name: "Paul" });
  await createBookCopy({ bookId: book.id, borrowerId: borrower.id });

  const author = await createAuthor({ name: "George Lucas" });
  await createBook({ authorId: author.id, title: "Star Wars IV" });
  await createBook({ authorId: author.id, title: "Star Wars V" });

  // When
  const res = await getTestClient().query({
    query: gql`
      query {
        booksCount
        books {
          id
          title
          cover {
            path
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
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();
});

it("fetches books with authors", async () => {
  // Given
  const author = await createAuthor({ name: "Tolkien" });
  await createBook({ title: "Hobbit", authorId: author.id });
  await createBook({ title: "Lord of the Rings", authorId: author.id });
  await createBook();
  await createBook();

  // When
  const res = await getTestClient().query({
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
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();
});

it("fetches a book", async () => {
  // Given
  const author = await createAuthor({ name: "Andrzej Sapkpwski" });
  const book = await createBook({
    title: "Blood of Elves",
    authorId: author.id,
    createdAt: new Date(Date.UTC(2020, 6, 19, 14, 30)),
    updatedAt: new Date(Date.UTC(2020, 6, 19, 14, 45))
  });

  const owner = await createUser({ name: "John" });
  const borrower = await createUser({ name: "Paul" });
  await createBookCopy({
    bookId: book.id,
    ownerId: owner.id,
    borrowerId: borrower.id
  });
  await createBookCopy({ bookId: book.id });

  // When
  const res = await getTestClient().query({
    query: gql`
      query($id: ID!) {
        book(id: $id) {
          id
          title
          description
          createdAt
          updatedAt
          copies {
            id
            owner {
              id
              name
              avatar {
                image {
                  url
                }
                color
              }
            }
            borrower {
              id
              name
              avatar {
                image {
                  url
                }
                color
              }
            }
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(book.id, "Book") }
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();
});

it("fetches a book with details", async () => {
  // Given
  const book = await createBook({
    title: "The lady of the lake",
    authorAttributes: {
      name: "Andrzej Sapkowski"
    }
  });

  const GetBookWithDetailsQuery = gql`
    query($id: ID!, $includeDetails: Boolean!, $hideCover: Boolean = true) {
      book(id: $id) {
        id
        title
        description @include(if: $includeDetails)
        author @include(if: $includeDetails) {
          name
        }

        cover @skip(if: $hideCover) {
          url
        }
      }
    }
  `;

  // When
  let res = await getTestClient().query({
    query: GetBookWithDetailsQuery,
    variables: {
      id: secureId.toExternal(book.id, "Book"),
      includeDetails: true,
      hideCover: false
    }
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();

  // When
  res = await getTestClient().query({
    query: GetBookWithDetailsQuery,
    variables: {
      id: secureId.toExternal(book.id, "Book"),
      includeDetails: false
    }
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();
});

it("responds with error when book cannot be found", async () => {
  // Given
  // When
  const res = await getTestClient().query({
    query: gql`
      query($id: ID!) {
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
  const author = await createAuthor({ name: "Andrzej Sapkowski" });
  await createBook({ authorId: author.id });
  await createBook({ authorId: author.id });

  // When
  const res = await getTestClient().query({
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
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();
});

it("fetches a random book", async () => {
  // Given
  const author = await createAuthor({ name: "Andrzej Sapkowski" });
  await createBook({
    authorId: author.id,
    title: "The tower of the swallow",
    coverPath: "/images/book-covers/witcher4.jpg"
  });

  // When
  const res = await getTestClient().query({
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
  expect(res.data).not.toBeNull();
  expect(res.data!.randomBook).toMatchSnapshot();
});
