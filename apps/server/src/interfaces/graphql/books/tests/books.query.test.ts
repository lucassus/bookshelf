import { gql } from "apollo-server-express";

import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "~/infra/factories";
import { createTestClient } from "~/interfaces/graphql/createTestClient";

describe("books query", () => {
  it("fetches books", async () => {
    // Given
    const author = await createAuthor({ name: "George Lucas" });
    await createBook({ author, title: "Star Wars V" });
    await createBook({ author, title: "Star Wars IV" });

    const book = await createBook({
      title: "Dune",
      authorAttributes: { name: "Frank Herbert" }
    });
    await createBookCopy({ book, ownerAttributes: { name: "John" } });

    const borrower = await createUser({ name: "Paul" });
    await createBookCopy({ book, borrower });

    await createBook({ title: "Blood of Elves" });

    // When
    const res = await createTestClient().query({
      query: gql`
        query {
          booksCount
          books {
            id
            title
            copies {
              owner {
                id
                name
              }
              borrower {
                id
                name
              }
              borrowedAt
            }
          }
        }
      `
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBeNull();
    expect(res.data).toMatchObject({
      booksCount: 4,
      books: [
        { id: expect.any(String), title: "Blood of Elves", copies: [] },
        {
          id: expect.any(String),
          title: "Dune",
          copies: [
            { owner: { id: expect.any(String), name: "John" }, borrower: null },
            {
              owner: expect.any(Object),
              borrower: { id: expect.any(String), name: "Paul" },
              borrowedAt: expect.any(String)
            }
          ]
        },
        { id: expect.any(String), title: "Star Wars IV", copies: [] },
        { id: expect.any(String), title: "Star Wars V", copies: [] }
      ]
    });
  });

  it("fetches books with authors", async () => {
    // Given
    const author = await createAuthor({ name: "Tolkien" });
    await createBook({ title: "Hobbit", author });
    await createBook({ title: "Lord of the Rings", author });
    await createBook();
    await createBook();

    // When
    const res = await createTestClient().query({
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

  it("fetches books along with authors and books again", async () => {
    // Given
    const author = await createAuthor({ name: "Andrzej Sapkowski" });
    await createBook({ author });
    await createBook({ author });

    // When
    const res = await createTestClient().query({
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
});
