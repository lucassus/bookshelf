import { gql } from "apollo-server-express";

import {
  createAuthor,
  createBook,
  createBookCopy,
  createUser
} from "../src/database/factories";
import { secureId } from "../src/database/helpers";
import { getTestClient } from "./helpers";

describe("fetching anything", () => {
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
      email
    }
  `;

  it("fetches Author", async () => {
    // Given
    const { query } = getTestClient();

    const author = await createAuthor();
    await createBook({ authorId: author.id });
    await createBook({ authorId: author.id });
    await createBook({ authorId: author.id });

    // When
    const res = await getTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(author.id, "Author") }
    });

    // Then
    expect(res.data!.anything).toMatchSnapshot();
  });

  it("fetches Book", async () => {
    // Given
    const book = await createBook();

    // When
    const res = await getTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(book.id, "Book") }
    });

    // Then
    expect(res.data!.anything).toMatchSnapshot();
  });

  it("fetches User", async () => {
    // Given
    const user = await createUser();

    // When
    const res = await getTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(user.id, "User") }
    });

    // Then
    expect(res.data!.anything).toMatchSnapshot();
  });

  it("fetches BookCopy", async () => {
    // Given
    const user = await createUser();
    const bookCopy = await createBookCopy({ borrowerId: user.id });

    // When
    const res = await getTestClient().query({
      query: GetAnythingQuery,
      variables: { id: secureId.toExternal(bookCopy.id, "BookCopy") }
    });

    // Then
    expect(res.data!.anything).toMatchSnapshot();
  });
});

it("fetches with aliases", async () => {
  // Given
  const book = await createBook();
  const author = await createAuthor();
  const user = await createUser();

  // When
  const res = await getTestClient().query({
    query: gql`
      query($bookId: ID!, $authorId: ID!, $userId: ID!) {
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
  expect(res.data).toMatchSnapshot();
});
