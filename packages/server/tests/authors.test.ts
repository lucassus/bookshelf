import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";

import { createAuthor, createBook } from "../src/database/factories";
import { secureId } from "../src/database/helpers";
import { createServer } from "../src/server";

let server: ApolloServer;

beforeEach(async () => {
  server = createServer();
});

it("fetches an author", async () => {
  const { query } = createTestClient(server);

  await createAuthor({
    name: "J. R. R. Tolkien",
    bio:
      "John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic. He was the author of the high fantasy works The Hobbit and The Lord of the Rings.",
    createdAt: new Date(Date.UTC(2019, 11, 31, 14, 30)),
    updatedAt: new Date(Date.UTC(2020, 6, 19, 13, 20))
  });

  // When
  const res = await query({
    query: gql`
      query GetAuthor($id: ID!) {
        author(id: $id) {
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
    `,
    variables: { id: secureId.toExternal(1, "Author") }
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();
});

it("fetches authors along with books", async () => {
  // Given
  const { query } = createTestClient(server);

  const firstAuthor = await createAuthor();
  await createBook({ authorId: firstAuthor.id });
  await createBook({ authorId: firstAuthor.id });
  await createBook({ authorId: firstAuthor.id });

  const secondAuthor = await createAuthor();
  await createBook({ authorId: secondAuthor.id });
  await createBook({ authorId: secondAuthor.id });

  // When
  const res = await query({
    query: gql`
      query {
        authors {
          id
          name
          books {
            id
            title
            description
          }
        }
      }
    `
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();
});
