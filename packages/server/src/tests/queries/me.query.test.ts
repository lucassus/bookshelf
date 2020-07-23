import { gql } from "apollo-server-express";

import { createUser } from "../factories";
import { getTestClient } from "../hepers";

describe("me query", () => {
  it("returns the current user when authenticated", async () => {
    // Given
    const currentUser = await createUser();

    // When
    const res = await getTestClient({ currentUser }).query({
      query: gql`
        query {
          me {
            id
            email
            name
          }
        }
      `
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      me: {
        id: expect.any(String),
        email: currentUser.email,
        name: currentUser.name
      }
    });
  });

  it("returns null is not authenticated", async () => {
    // When
    const res = await getTestClient().query({
      query: gql`
        query {
          me {
            id
            email
            name
          }
        }
      `
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({ me: null });
  });
});
