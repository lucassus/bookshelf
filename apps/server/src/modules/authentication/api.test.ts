import { HttpStatusCodes } from "../../http-status-codes";
import { createUser } from "../../infra/factories";
import { createRestTestClient } from "../../testUtils/createRestTestClient";

describe("POST /api/auth/logout", () => {
  it("allows to log out a user", async () => {
    // Given
    const currentUser = await createUser({
      name: "Luke",
      email: "luke@example.com"
    });

    // When
    const response = await createRestTestClient({ currentUser }).post(
      "/api/auth/logout"
    );

    // Then
    expect(response.status).toBe(HttpStatusCodes.OK);
    expect(response.headers["set-cookie"][0]).toContain(
      "bookshelf:authToken=;"
    );
  });

  it("allows to log out with invalid auth token", async () => {
    // When
    const response = await createRestTestClient({ authToken: "invalid" }).post(
      "/api/auth/logout"
    );

    // Then
    expect(response.status).toBe(HttpStatusCodes.OK);
    expect(response.headers["set-cookie"][0]).toContain(
      "bookshelf:authToken=;"
    );
  });
});
