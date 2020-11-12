import { createBook } from "@/infra/factories";
import { createTestClient } from "@/interfaces/http/createTestClient";
import { StatusCodes } from "@/interfaces/http/StatusCodes";

test("GET /api/books", async () => {
  // Given
  await createBook({
    title: "Dune",
    authorAttributes: { name: "Frank Herbert" }
  });

  await createBook({
    title: "Hobbit",
    authorAttributes: { name: "J. R. R. Tolkien" }
  });

  // When
  const response = await createTestClient().get("/api/books");

  // Then
  expect(response.status).toBe(StatusCodes.OK);
  expect(response.body).toMatchObject([
    {
      id: 1,
      title: "Dune",
      author: {
        name: "Frank Herbert"
      }
    },
    {
      id: 2,
      title: "Hobbit",
      author: {
        name: "J. R. R. Tolkien"
      }
    }
  ]);
});
