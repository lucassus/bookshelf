import { createBookCopy, createUser } from "@/infra/factories";
import { createTestClient } from "@/interfaces/http/createTestClient";
import { HttpStatusCodes } from "@/interfaces/http/HttpStatusCodes";

describe("GET /api/me", () => {
  it("returns the current user", async () => {
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
    const response = await createTestClient({ currentUser }).get("/api/me");

    // Then
    expect(response.status).toBe(HttpStatusCodes.OK);
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

  it("returns an error when not authorized", async () => {
    // When
    const response = await createTestClient().get("/api/me");

    // Then
    expect(response.status).toBe(HttpStatusCodes.Unauthorized);
    expect(response.text).toBe("Missing authentication token");
  });

  it("returns a error when auth token is invalid", async () => {
    // When
    const response = await createTestClient({ authToken: "invalid" }).get(
      "/api/me"
    );

    // Then
    expect(response.status).toBe(HttpStatusCodes.Unauthorized);
    expect(response.text).toBe("Invalid authentication token");
  });
});
