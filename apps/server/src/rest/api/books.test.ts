import { HttpStatusCodes } from "../../http-status-codes";
import { createRestTestClient } from "../../testUtils/createRestTestClient";
import { createBook } from "../../testUtils/factories";

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
  const response = await createRestTestClient().get("/api/books");

  // Then
  expect(response.status).toBe(HttpStatusCodes.Ok);
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
