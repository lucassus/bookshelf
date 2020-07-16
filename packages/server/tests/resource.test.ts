import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";

import { secureId } from "../src/database/helpers";
import { loadFixtures } from "../src/fixtures";
import { createServer } from "../src/server";

let server: ApolloServer;

beforeEach(async () => {
  await loadFixtures();
  server = createServer();
});

describe("fetching resource", () => {
  const GetResourceQuery = gql`
    query($id: ID!) {
      resource(id: $id) {
        __typename
        id

        ... on Book {
          title
        }

        ... on Author {
          name
        }
      }
    }
  `;

  it("fetches Book", async () => {
    // Given
    const { query } = createTestClient(server);

    // When
    const res = await query({
      query: GetResourceQuery,
      variables: { id: secureId.toExternal(1, "Book") }
    });

    // Then
    expect(res.data!.resource).toMatchSnapshot();
  });

  it("fetches Author", async () => {
    // Given
    const { query } = createTestClient(server);

    // When
    const res = await query({
      query: GetResourceQuery,
      variables: { id: secureId.toExternal(1, "Author") }
    });

    // Then
    expect(res.data!.resource).toMatchSnapshot();
  });
});
