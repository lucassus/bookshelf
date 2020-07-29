import { createRestTestClient } from "../../testUtils/createRestTestClient";
import { createUser } from "../../testUtils/factories";

test("GET /api/auth/me", async () => {
  // Given
  const currentUser = await createUser({
    name: "Luke",
    email: "luke@example.com"
  });

  // When
  const response = await createRestTestClient({ currentUser }).get(
    "/api/auth/me"
  );

  // Then
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({
    id: 1,
    email: "luke@example.com"
  });
});
