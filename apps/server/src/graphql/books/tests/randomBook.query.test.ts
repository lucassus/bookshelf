import { gql } from "apollo-server-express";
import { Container } from "typedi";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createBook } from "../../../testUtils/factories";
import { BooksService } from "../services/BooksService";

test("randomBook query", async () => {
  // Given
  const book = await createBook({
    title: "The tower of the swallow",
    coverPath: "/images/book-covers/witcher4.jpg"
  });

  const fakeBooksService: Partial<BooksService> = {
    findRandom: jest.fn().mockResolvedValue(book)
  };
  Container.set(BooksService, fakeBooksService);

  // When
  const res = await createTestClient().query({
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
  expect(res.errors).toBe(undefined);
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
