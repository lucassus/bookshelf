import { gql } from "apollo-server-express";

import { createAuthor, createBook, createUser } from "~/infra/factories";
import { toExternalId } from "~/infra/support/secureId";
import { createTestClient } from "~/interfaces/graphql/createTestClient";

describe("resource query", () => {
  const GetResourceQuery = gql`
    query($id: ID!) {
      resource(id: $id) {
        __typename
        id

        ... on Book {
          title
          description
        }

        ... on Author {
          name
          bio
        }

        ... on User {
          name
          info

          ... on ProtectedUser {
            email
          }
        }

        ... on Timestampable {
          createdAt
          updatedAt
        }
      }
    }
  `;

  it("fetches a Book", async () => {
    // Given
    const book = await createBook();

    // When
    const res = await createTestClient().query({
      query: GetResourceQuery,
      variables: { id: toExternalId(book) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      resource: {
        __typename: "Book",
        id: toExternalId(book),
        title: book.title,
        description: book.description,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    });
  });

  it("fetches an Author", async () => {
    // Given
    const author = await createAuthor();

    // When
    const res = await createTestClient().query({
      query: GetResourceQuery,
      variables: { id: toExternalId(author) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      resource: {
        __typename: "Author",
        name: author.name,
        bio: author.bio,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    });
  });

  it("fetches a user", async () => {
    const user = await createUser();

    // When
    const res = await createTestClient({ currentUser: user }).query({
      query: GetResourceQuery,
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      resource: {
        __typename: "ProtectedUser",
        name: user.name,
        info: user.info,
        email: user.email,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      }
    });
  });
});
