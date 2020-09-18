import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createAuthor, createBook } from "../../../testUtils/factories";

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
});
