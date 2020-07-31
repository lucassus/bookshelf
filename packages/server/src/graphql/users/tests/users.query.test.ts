import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";
import { Role } from "../../resolvers-types.generated";

describe("users query", () => {
  it("fetches users", async () => {
    // Given
    const user1 = await createUser({ name: "Alice" });
    const user2 = await createUser({ name: "Bob" });
    const user3 = await createUser({ name: "Luke" });

    // When
    const res = await createTestClient().query({
      query: gql`
        query {
          users {
            id
            name
            info
            avatar {
              image {
                path
                url
              }
              color
            }
          }
        }
      `
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).not.toBe(null);
    expect(res.data).toMatchObject({
      users: [
        {
          id: expect.any(String),
          name: user1.name,
          info: user1.info
        },
        {
          id: expect.any(String),
          name: user2.name,
          info: user2.info
        },
        {
          id: expect.any(String),
          name: user3.name,
          info: user3.info
        }
      ]
    });
  });

  // TODO: Provide a better description
  // TODO: Consider refactor with a table
  test.each<[undefined | Role, boolean, undefined | string]>([
    [undefined, false, "Unauthorized access! Please log in."],
    [Role.User, false, "Unauthorized access! Please log in as admin."],
    [Role.Admin, true, undefined]
  ])("fetching email fields 2", async (role, success, expectedErrorMessage) => {
    // Given
    const currentUser = role
      ? await createUser({ isAdmin: role === Role.Admin })
      : undefined;
    const otherUser = await createUser();

    // When
    const res = await createTestClient({ currentUser }).query({
      query: gql`
        query {
          users {
            id
            email
          }
        }
      `
    });

    if (success && currentUser) {
      expect(res.errors).toBe(undefined);

      expect(res.data).not.toBe(null);
      expect(res.data).toMatchObject({
        users: [
          { id: expect.any(String), email: currentUser.email },
          { id: expect.any(String), email: otherUser.email }
        ]
      });
    } else {
      expect(res.errors).not.toBe(undefined);
      expect(res.errors![0].message).toBe(expectedErrorMessage);
    }
  });
});
