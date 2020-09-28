import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

describe("currentUser query", () => {
  const GetCurrentUser = gql`
    query {
      currentUser {
        __typename
        id
        name
        email
        isAdmin
        avatar {
          __typename

          ... on Avatar {
            image {
              path
            }
            color
          }
        }
      }
    }
  `;

  it("returns the current user when authenticated", async () => {
    // Given
    const currentUser = await createUser({
      isAdmin: true,
      avatarAttributes: { color: "green" }
    });

    // When
    const res = await createTestClient({ currentUser }).query({
      query: GetCurrentUser
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      currentUser: {
        __typename: "ProtectedUser",
        id: expect.any(String),
        name: currentUser.name,
        email: currentUser.email,
        isAdmin: true,
        avatar: { color: "green" }
      }
    });
  });

  it("returns an error if not authenticated", async () => {
    // When
    const res = await createTestClient().query({
      query: GetCurrentUser
    });

    // Then
    expect(res.errors).toHaveLength(1);

    const error = res.errors![0];
    expect(error.message).toBe("Unauthorized access! Please log in.");
    expect(error.path).toEqual(["currentUser"]);
    expect(error.extensions!.code).toBe("UNAUTHENTICATED");
  });
});
