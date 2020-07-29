import { generateAuthToken } from "../../common/authentication";
import { createUser } from "../../testUtils/factories";
import { createRestTestClient } from "../../testUtils/hepers";

describe("GET /api/books", () => {
  it("responds with users when authenticated", async () => {
    // Given
    const currentUser = await createUser({
      name: "Alice",
      email: "alice@email.com"
    });
    await createUser({ name: "John", email: "john@email.com" });
    await createUser({ name: "Anna", email: "anna@email.com" });

    // When
    const authToken = generateAuthToken(currentUser);
    const response = await createRestTestClient()
      .get("/api/users")
      .set("Authorization", `Bearer ${authToken}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([
      {
        id: 1,
        name: "Alice",
        email: "alice@email.com"
      },
      {
        id: 2,
        name: "John",
        email: "john@email.com"
      },
      {
        id: 3,
        name: "Anna",
        email: "anna@email.com"
      }
    ]);
  });

  it("responds with error when not authenticated", async () => {
    // When
    const response = await createRestTestClient().get("/api/users");

    // Then
    expect(response.status).toBe(401);
  });
});
