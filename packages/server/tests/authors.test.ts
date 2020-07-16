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

it("fetches an author", async () => {
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query GetAuthor($id: ID!) {
        author(id: $id) {
          id
          name
          bio
          books {
            title
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(1, "Author") }
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

it("fetches authors along with books", async () => {
  // Given
  const { query } = createTestClient(server);

  // When
  const res = await query({
    query: gql`
      query {
        authors {
          name
          books {
            title
          }
        }
      }
    `
  });

  // Then
  expect(res.data).not.toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
