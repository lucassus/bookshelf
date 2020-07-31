import { gql } from "apollo-server-express";

import { secureId } from "../../../common/secureId";
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
      }
    }
  `;

  it("fetches Book", async () => {
    // Given
    const book = await createBook();

    // When
    const res = await createTestClient().query({
      query: GetResourceQuery,
      variables: { id: secureId.toExternal(book.id, "Book") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("fetches Author", async () => {
    // Given
    const author = await createAuthor();

    // When
    const res = await createTestClient().query({
      query: GetResourceQuery,
      variables: { id: secureId.toExternal(author.id, "Author") }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });
});
