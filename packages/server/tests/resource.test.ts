import { gql } from "apollo-server-express";

import { createAuthor, createBook } from "../src/database/factories";
import { secureId } from "../src/database/helpers";
import { getTestClient } from "../src/testHelpers";

describe("fetching resource", () => {
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
    const res = await getTestClient().query({
      query: GetResourceQuery,
      variables: { id: secureId.toExternal(book.id, "Book") }
    });

    // Then
    expect(res.data!.resource).toMatchSnapshot();
  });

  it("fetches Author", async () => {
    // Given
    const author = await createAuthor();

    // When
    const res = await getTestClient().query({
      query: GetResourceQuery,
      variables: { id: secureId.toExternal(author.id, "Author") }
    });

    // Then
    expect(res.data!.resource).toMatchSnapshot();
  });
});
