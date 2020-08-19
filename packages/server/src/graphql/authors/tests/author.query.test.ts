import { gql } from "apollo-server-express";

import { secureId } from "../../../common/secureId";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createAuthor } from "../../../testUtils/factories";

test("author query", async () => {
  await createAuthor({
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
  expect(res.errors).toBe(undefined);
  expect(res.data).toMatchInlineSnapshot(`
    Object {
      "author": Object {
        "bio": "John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic. He was the author of the high fantasy works The Hobbit and The Lord of the Rings.",
        "createdAt": "2019-12-31T14:30:00.000Z",
        "id": "MS1BdXRob3I=",
        "name": "J. R. R. Tolkien",
        "photo": Object {
          "url": "https://res.cloudinary.com/lucassus/image/upload/bookshelf/images/book-authors/james-s-a-corey.jpg",
        },
        "updatedAt": "2020-07-19T13:20:00.000Z",
      },
    }
  `);
});
