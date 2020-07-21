import { gql } from "apollo-server-express";

import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "../factories";
import { getTestClient } from "../hepers";

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
    expect(res.errors).toBe(undefined);
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
});
