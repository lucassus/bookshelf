import { createBook } from "../../infra/factories";
import { HttpStatusCodes } from "../../infra/HttpStatusCodes";
import { createRestTestClient } from "../../infra/testing/createRestTestClient";

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
  expect(response.status).toBe(HttpStatusCodes.OK);
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
