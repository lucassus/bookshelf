import { createUser } from "../../testUtils/factories";
import { createRestTestClient } from "../../testUtils/hepers";

test("GET /api/books", async () => {
  // Given
  await createUser({ name: "Alice", email: "alice@email.com" });
  await createUser({ name: "John", email: "john@email.com" });
  await createUser({ name: "Anna", email: "anna@email.com" });

  // When
  const response = await createRestTestClient().get("/api/users");

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
