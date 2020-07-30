import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

describe("me query", () => {
  it("returns the current user when authenticated", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: true });

    // When
    const res = await createTestClient({ currentUser }).query({
      query: gql`
        query {
          me {
            id
            name
            email
            isAdmin
          }
        }
      `
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      me: {
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
      query: gql`
        query {
          me {
            id
          }
        }
      `
    });

    // Then
    expect(res.errors).not.toBe(undefined);

    const error = res.errors![0];
    expect(error.message).toBe("Unauthorized access! Please log in.");
    expect(error.extensions!.code).toBe("UNAUTHENTICATED");
  });
});
