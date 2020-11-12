import { createUser } from "@/infra/factories";
import { createTestClient } from "@/interfaces/http/createTestClient";
import { HttpStatusCodes } from "@/interfaces/http/HttpStatusCodes";

describe("GET /api/admin/users", () => {
  it("responds with users when authenticated", async () => {
    // Given
    const currentUser = await createUser({
      name: "Alice",
      email: "alice@email.com",
      isAdmin: true
    });
    await createUser({ name: "John", email: "john@email.com" });
    await createUser({ name: "Anna", email: "anna@email.com" });

    // When
    const response = await createTestClient({ currentUser }).get(
      "/api/admin/users"
    );

    // Then
    expect(response.status).toBe(HttpStatusCodes.OK);
    expect(response.body).toMatchObject([
      {
        id: 1,
        name: "Alice",
        email: "alice@email.com"
      },
      {
        id: 3,
        name: "Anna",
        email: "anna@email.com"
      },
      {
        id: 2,
        name: "John",
        email: "john@email.com"
      }
    ]);
  });

  it("responds with error when not authenticated", async () => {
    const response = await createTestClient().get("/api/admin/users");
    expect(response.status).toBe(HttpStatusCodes.Unauthorized);
    expect(response.text).toBe("Missing authentication token");
  });

  it("responds with error when auth token is invalid", async () => {
    const response = await createTestClient({ authToken: "invalid" }).get(
      "/api/admin/users"
    );
    expect(response.status).toBe(HttpStatusCodes.Unauthorized);
    expect(response.text).toBe("Invalid authentication token");
  });

  it("responds with error when not authenticated as admin", async () => {
    const currentUser = await createUser({ isAdmin: false });
    const response = await createTestClient({ currentUser }).get(
      "/api/admin/users"
    );
    expect(response.status).toBe(HttpStatusCodes.Forbidden);
    expect(response.text).toBe("Forbidden");
  });
});
