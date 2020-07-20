import { gql } from "apollo-server-express";

import { secureId } from "../../database/helpers";
import { createAuthor, createBook } from "../factories";
import { getTestClient } from "../hepers";

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
