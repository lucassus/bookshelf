import { gql } from "apollo-server-express";

import { secureId } from "../../database/helpers";
import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "../factories";
import { createTestClient } from "../hepers";

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
    await createBook({ authorId: author.id });
    await createBook({ authorId: author.id });
    await createBook({ authorId: author.id });

    // When
    const res = await createTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(author.id, "Author") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data!.anything).toMatchSnapshot();
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
    expect(res.data!.anything).toMatchSnapshot();
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
    expect(res.data!.anything).toMatchSnapshot();
  });

  it("fetches BookCopy", async () => {
    // Given
    const user = await createUser();
    const bookCopy = await createBookCopy({ borrowerId: user.id });

    // When
    const res = await createTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(bookCopy.id, "BookCopy") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data!.anything).toMatchSnapshot();
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
          id
          externalId: id
          headline: title
          description
        }

        author(id: $authorId) {
          id
          headline: name
          description: bio
        }

        user(id: $userId) {
          id
          headline: name
          description: info
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
