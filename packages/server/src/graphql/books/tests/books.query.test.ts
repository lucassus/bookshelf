import { gql } from "apollo-server-express";

import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "../../../testUtils/factories";
import { createTestClient } from "../../../testUtils/hepers";

describe("books query", () => {
  it("fetches books", async () => {
    // Given
    const book = await createBook({ title: "Hobbit" });
    await createBookCopy({
      bookId: book.id,
      ownerAttributes: { name: "John" }
    });
    const borrower = await createUser({ name: "Paul" });
    await createBookCopy({ bookId: book.id, borrowerId: borrower.id });

    const author = await createAuthor({ name: "George Lucas" });
    await createBook({ author, title: "Star Wars IV" });
    await createBook({ author, title: "Star Wars V" });

    // When
    const res = await createTestClient().query({
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
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBeNull();
    expect(res.data).toMatchSnapshot();
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
