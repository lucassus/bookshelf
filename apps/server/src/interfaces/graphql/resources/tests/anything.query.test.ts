import { gql } from "apollo-server-express";

import { createAuthor, createBook, createUser } from "~/infra/factories";
import { toExternalId } from "~/infra/support/secureId";
import { createTestClient } from "~/interfaces/graphql/createTestClient";

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
      }
    }

    fragment BookFragment on Book {
      id
      title
      description
    }

    fragment UserFragment on User {
      id
      name

      ... on ProtectedUser {
        email
        isAdmin
      }
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
      variables: { id: toExternalId(author) }
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
      variables: { id: toExternalId(book) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("fetches User", async () => {
    // Given
    const user = await createUser();

    // When
    const res = await createTestClient({ currentUser: user }).query({
      query: GetAnythingQuery,
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      anything: {
        __typename: "ProtectedUser",
        id: expect.any(String),
        name: "Randolph Satterfield",
        email: "Lauryn.Crist@yahoo.com",
        isAdmin: false
      }
    });
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
      bookId: toExternalId(book),
      authorId: toExternalId(author),
      userId: toExternalId(user)
    }
  });

  // Then
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchSnapshot();
});
