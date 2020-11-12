import { gql } from "apollo-server-express";
import { getConnection } from "typeorm";

import { toExternalId } from "../../../common/secureId";
import { Book } from "../../../infra/database/entity";
import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "../../../infra/factories";
import { createTestClient } from "../../../testUtils/createTestClient";

describe("book query", () => {
  it("fetches a book", async () => {
    // Given
    const book = await createBook();

    // When
    const res = await createTestClient().query({
      query: gql`
        query($id: ExternalID!) {
          book(id: $id) {
            ... on Book {
              id
              title
              description
              createdAt
              updatedAt
            }
          }
        }
      `,
      variables: { id: toExternalId(book) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBe(null);
    expect(res.data).toEqual({
      book: {
        id: toExternalId(book),
        title: book.title,
        description: book.description,
        createdAt: book.createdAt.toISOString(),
        updatedAt: book.createdAt.toISOString()
      }
    });
  });

  describe("isFavourite resolver", () => {
    const query = gql`
      query($id: ExternalID!) {
        book(id: $id) {
          ... on Book {
            id
            title
            isFavourite
          }
        }
      }
    `;

    it("return null when not authenticated", async () => {
      // Given
      const book = await createBook();

      // When
      const resp = await createTestClient().query({
        query,
        variables: { id: toExternalId(book) }
      });

      // Then
      expect(resp.data!.book.isFavourite).toBe(null);
    });

    describe("when a user is authenticated", () => {
      it("returns true", async () => {
        // Given
        const book = await createBook();

        const user = await createUser();
        user.favouriteBooks = Promise.resolve([book]);
        await getConnection().manager.save(user);

        // When
        const resp = await createTestClient({ currentUser: user }).query({
          query,
          variables: { id: toExternalId(book) }
        });

        // Then
        expect(resp.data!.book.isFavourite).toBe(true);
      });

      it("returns false", async () => {
        // Given
        const book = await createBook();
        const user = await createUser();

        // When
        const resp = await createTestClient({ currentUser: user }).query({
          query,
          variables: { id: toExternalId(book) }
        });

        // Then
        expect(resp.data!.book.isFavourite).toBe(false);
      });
    });
  });

  it("fetches a book along with the other resources", async () => {
    // Given
    const author = await createAuthor({ name: "Andrzej Sapkpwski" });
    const book = await createBook({
      author,
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
    await createBookCopy({ book, owner, borrower });
    await createBookCopy({ book });

    // When
    const res = await createTestClient().query({
      query: gql`
        query($id: ExternalID!) {
          book(id: $id) {
            ... on Book {
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
                    ... on Avatar {
                      image {
                        path
                        url
                      }
                      color
                    }
                  }
                }
                borrower {
                  id
                  name
                  avatar {
                    ... on Avatar {
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
          }
        }
      `,
      variables: { id: toExternalId(book) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBeNull();
    expect(res.data).toMatchObject({
      book: {
        id: toExternalId(book),
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
    // Given
    const book = new Book();
    book.id = 1234;

    // When
    const res = await createTestClient().query({
      query: gql`
        query($id: ExternalID!) {
          book(id: $id) {
            ... on ResourceNotFoundError {
              message
            }
          }
        }
      `,
      variables: { id: toExternalId(book) }
    });

    // Then
    expect(res.data).toEqual({
      book: {
        message: "Could not find Book"
      }
    });
  });
});
