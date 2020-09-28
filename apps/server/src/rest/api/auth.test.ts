import { HttpStatusCodes } from "../../http-status-codes";
import { createRestTestClient } from "../../testUtils/createRestTestClient";
import { createBookCopy, createUser } from "../../testUtils/factories";

test("GET /api/auth/me", async () => {
  // Given
  const currentUser = await createUser({
    name: "Luke",
    email: "luke@example.com"
  });
  await createBookCopy({
    bookAttributes: { title: "Dune" },
    borrower: currentUser
  });
  await createBookCopy({
    bookAttributes: { title: "Ender's Game" },
    borrower: currentUser
  });

  // When
  const response = await createRestTestClient({ currentUser }).get(
    "/api/auth/me"
  );

  // Then
  expect(response.status).toBe(HttpStatusCodes.Ok);
  expect(response.body).toMatchObject({
    id: expect.any(Number),
    name: "Luke",
    email: "luke@example.com",
    borrowedBooks: [
      {
        id: expect.any(Number),
        title: "Dune"
      },
      {
        id: expect.any(Number),
        title: "Ender's Game"
      }
    ]
  });
});
