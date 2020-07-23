import { gql } from "apollo-server-express";

import { createUser } from "../factories";
import { getTestClient } from "../hepers";

describe("me query", () => {
  it("returns the current user when authenticated", async () => {
    // Given
    const currentUser = await createUser({ isAdmin: true });

    // When
    const res = await getTestClient({ currentUser }).query({
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

  it("returns error if not authenticated", async () => {
    // When
    const res = await getTestClient().query({
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
  });
});
