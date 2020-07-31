import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

describe("me query", () => {
  const GetCurrentUser = gql`
    query {
      currentUser {
        id
        name
        email
        isAdmin
      }
    }
  `;

  it("returns the current user when authenticated", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: true });

    // When
    const res = await createTestClient({ currentUser }).query({
      query: GetCurrentUser
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      currentUser: {
        id: expect.any(String),
        name: currentUser.name,
        email: currentUser.email,
        isAdmin: true
      }
    });
  });

  it("returns an error if not authenticated", async () => {
    // When
    const res = await createTestClient().query({
      query: GetCurrentUser
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors![0];
    expect(error.message).toBe("Unauthorized access! Please log in.");
    expect(error.extensions!.code).toBe("UNAUTHENTICATED");
  });
});
