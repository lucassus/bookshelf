import { gql } from "apollo-server-express";

import { secureId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "../../../testUtils/factories";

describe("anything query", () => {
  const GetAnythingQuery = gql`
    query($id: ID!) {
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
    }
  `;

  it("fetches Author", async () => {
    // Given
    const author = await createAuthor();
    await createBook({ author });
    await createBook({ author });
    await createBook({ author });

    // When
    const res = await createTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(author.id, "Author") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("fetches Book", async () => {
    // Given
    const book = await createBook();

    // When
    const res = await createTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(book.id, "Book") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("fetches User", async () => {
    // Given
    const user = await createUser();

    // When
    const res = await createTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(user.id, "User") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("fetches BookCopy", async () => {
    // Given
    const borrower = await createUser();
    const bookCopy = await createBookCopy({ borrower });

    // When
    const res = await createTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(bookCopy.id, "BookCopy") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });
});

it("fetches with aliases", async () => {
  // Given
  const book = await createBook();
  const author = await createAuthor();
  const user = await createUser();

  // When
  const res = await createTestClient().query({
    query: gql`
      query(
        $bookId: ExternalID!
        $authorId: ExternalID!
        $userId: ExternalID!
      ) {
        something: book(id: $bookId) {
          ... on Book {
            id
            externalId: id
            headline: title
            description
          }
        }

        author(id: $authorId) {
          ... on Author {
            id
            headline: name
            description: bio
          }
        }

        user(id: $userId) {
          ... on User {
            id
            headline: name
            description: info
          }
        }
      }
    `,
    variables: {
      bookId: secureId.toExternal(book.id, "Book"),
      authorId: secureId.toExternal(author.id, "Author"),
      userId: secureId.toExternal(user.id, "User")
    }
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchSnapshot();
});
