import { gql } from "apollo-server-express";

import { secureId } from "../../database/helpers";
import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "../factories";
import { getTestClient } from "../hepers";

describe("book query", () => {
  it("fetches a book", async () => {
    // Given
    const book = await createBook();

    // When
    const id = secureId.toExternal(book.id, "Book");
    const res = await getTestClient().query({
      query: gql`
        query($id: ID!) {
          book(id: $id) {
            id
            title
            description
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id }
    });

    // Then
    expect(res.data).not.toBe(null);
    expect(res.data).toEqual({
      book: {
        id,
        title: book.title,
        description: book.description,
        createdAt: book.createdAt.toISOString(),
        updatedAt: book.createdAt.toISOString()
      }
    });
  });

  it("fetches a book along with other resources", async () => {
    // Given
    const author = await createAuthor({ name: "Andrzej Sapkpwski" });
    const book = await createBook({
      authorId: author.id,
      title: "Blood of Elves",
      description: "Blood of Elves is the first novel in the Witcher Saga.",
      createdAt: new Date(Date.UTC(2020, 6, 19, 14, 30)),
      updatedAt: new Date(Date.UTC(2020, 6, 19, 14, 45))
    });

    const owner = await createUser({
      name: "John",
      avatarAttributes: { color: "yellow" }
    });
    const borrower = await createUser({ name: "Paul" });
    await createBookCopy({
      bookId: book.id,
      ownerId: owner.id,
      borrowerId: borrower.id
    });
    await createBookCopy({ bookId: book.id });

    // When
    const id = secureId.toExternal(book.id, "Book");

    const res = await getTestClient().query({
      query: gql`
        query($id: ID!) {
          book(id: $id) {
            id
            title
            description
            author {
              id
              name
            }
            createdAt
            updatedAt
            copies {
              id
              owner {
                id
                name
                avatar {
                  image {
                    path
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
                    path
                    url
                  }
                  color
                }
              }
            }
          }
        }
      `,
      variables: { id }
    });

    // Then
    expect(res.data).not.toBeNull();
    expect(res.data).toMatchObject({
      book: {
        id,
        title: book.title,
        description: book.description,
        author: {
          id: expect.any(String),
          name: author.name
        },
        copies: [
          {
            id: expect.any(String),
            owner: {
              id: expect.any(String),
              name: owner.name,
              avatar: {
                image: {
                  path: expect.any(String),
                  url: expect.any(String)
                },
                color: "yellow"
              }
            },
            borrower: expect.objectContaining({
              id: expect.any(String)
            })
          },
          expect.objectContaining({
            id: expect.any(String)
          })
        ],
        createdAt: book.createdAt.toISOString(),
        updatedAt: book.updatedAt.toISOString()
      }
    });
  });

  it("responds with error when book cannot be found", async () => {
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
});
