import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import {
  createAuthor,
  createBook,
  createUser
} from "../../../testUtils/factories";

test("resources query", async () => {
  // Given
  const user = await createUser({ isAdmin: true });

  const author = await createAuthor({
    name: "Frank Herbert",
    bio: "American science-fiction writer"
  });

  const book = await createBook({
    author,
    title: "Dune",
    description:
      "Dune is a 1965 science-fiction novel by American author Frank Herbert"
  });

  // When
  const resp = await createTestClient({ currentUser: user }).query({
    query: gql`
      query {
        resources {
          __typename
          id

          ... on ProtectedUser {
            name
            description: info
          }

          ... on Author {
            name
            description: bio
          }

          ... on Book {
            name: title
            description
          }
        }
      }
    `
  });

  // Then
  expect(resp.errors).toBe(undefined);
  expect(resp.data).toMatchObject({
    resources: [
      {
        __typename: "ProtectedUser",
        id: toExternalId(user),
        name: user.name,
        description: user.info
      },
      {
        __typename: "Author",
        id: toExternalId(author),
        name: author.name,
        description: author.bio
      },
      {
        __typename: "Book",
        id: toExternalId(book),
        name: book.title,
        description: book.description
      }
    ]
  });
});