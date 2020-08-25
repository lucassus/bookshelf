import { gql } from "apollo-server-express";

import { secureId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createAuthor } from "../../../testUtils/factories";

describe("author query", () => {
  it("fetches author", async () => {
    // Given
    const author = await createAuthor({
      name: "J. R. R. Tolkien",
      bio:
        "John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic. He was the author of the high fantasy works The Hobbit and The Lord of the Rings.",
      createdAt: new Date(Date.UTC(2019, 11, 31, 14, 30)),
      updatedAt: new Date(Date.UTC(2020, 6, 19, 13, 20))
    });

    // When
    const res = await createTestClient().query({
      query: gql`
        query($id: ExternalID!) {
          author(id: $id) {
            ... on Author {
              id
              name
              bio
              photo {
                url
              }
              createdAt
              updatedAt
            }
          }
        }
      `,
      variables: { id: secureId.toExternal(author.id, "Author") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      author: {
        id: expect.any(String),
        bio: author.bio,
        name: author.name,
        createdAt: "2019-12-31T14:30:00.000Z",
        updatedAt: "2020-07-19T13:20:00.000Z"
      }
    });
  });

  it("responds with error when author cannot be found", async () => {
    // When
    const res = await createTestClient().query({
      query: gql`
        query($id: ExternalID!) {
          author(id: $id) {
            ... on AuthorNotFoundError {
              message
            }
          }
        }
      `,
      variables: { id: secureId.toExternal(1, "Author") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      author: {
        message: 'Could not find any entity of type "Author" matching: "1"'
      }
    });
  });
});
