import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { Author } from "../../../infra/database/entity";
import { createAuthor } from "../../../infra/factories";
import { createTestClient } from "../../../testUtils/createTestClient";

describe("author query", () => {
  const GetAuthorQuery = gql`
    query($id: ExternalID!) {
      author(id: $id) {
        ... on ResourceNotFoundError {
          message
        }

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
  `;

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
      query: GetAuthorQuery,
      variables: { id: toExternalId(author) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      author: {
        id: toExternalId(author),
        bio: author.bio,
        name: author.name,
        createdAt: "2019-12-31T14:30:00.000Z",
        updatedAt: "2020-07-19T13:20:00.000Z"
      }
    });
  });

  it("responds with error when author cannot be found", async () => {
    // When
    const author = new Author();
    author.id = 1234;

    const res = await createTestClient().query({
      query: GetAuthorQuery,
      variables: { id: toExternalId(author) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      author: {
        message: "Could not find Author"
      }
    });
  });
});
