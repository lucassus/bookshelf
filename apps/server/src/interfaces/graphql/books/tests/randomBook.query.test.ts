import { createBook } from "@/infra/factories";
import { BooksService } from "@/infra/services/BooksService";
import { createTestClient } from "@/interfaces/graphql/createTestClient";
import { gql } from "apollo-server-express";
import { Container } from "typedi";

test("randomBook query", async () => {
  // Given
  const book = await createBook({
    title: "The Tower of the Swallow",
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
