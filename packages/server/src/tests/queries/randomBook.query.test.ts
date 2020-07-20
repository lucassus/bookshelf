import { gql } from "apollo-server-express";

import { createAuthor, createBook } from "../factories";
import { getTestClient } from "../hepers";

test("randomBook query", async () => {
  // Given
  const author = await createAuthor({ name: "Andrzej Sapkowski" });
  const book = await createBook({
    authorId: author.id,
    title: "The tower of the swallow",
    coverPath: "/images/book-covers/witcher4.jpg"
  });

  // When
  const res = await getTestClient().query({
    query: gql`
      query {
        randomBook {
          id
          title
          cover {
            path
            url
          }
        }
      }
    `
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchObject({
    randomBook: {
      id: expect.any(String),
      title: book.title,
      cover: {
        path: book.coverPath,
        url: expect.any(String)
      }
    }
  });
});
