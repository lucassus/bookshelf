import { gql } from "apollo-server-express";

import {
  createAuthor,
  createBook,
  createUser
} from "../../../../infra/factories";
import { toExternalId } from "../../../../infra/support/secureId";
import { createTestClient } from "../../../../infra/testing/createTestClient";

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
            avatar {
              ... on Avatar {
                image {
                  ...ResourceImageFragment
                }
              }
            }
          }

          ... on Author {
            name
            description: bio
            image: photo {
              ...ResourceImageFragment
            }
          }

          ... on Book {
            name: title
            description
            image: cover {
              ...ResourceImageFragment
            }
          }
        }
      }

      fragment ResourceImageFragment on Image {
        path
        url
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
        description: user.info,
        avatar: { image: { path: user.avatar.imagePath } }
      },
      {
        __typename: "Author",
        id: toExternalId(author),
        name: author.name,
        description: author.bio,
        image: { path: author.photoPath }
      },
      {
        __typename: "Book",
        id: toExternalId(book),
        name: book.title,
        description: book.description,
        image: { path: book.coverPath }
      }
    ]
  });
});
