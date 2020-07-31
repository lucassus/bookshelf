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

  describe("fetching protected users emails", () => {
    test.each<[undefined | Role, undefined | string]>([
      [undefined, "Unauthorized access! Please log in."],
      [Role.User, "Unauthorized access! Please log in as admin."],
      [Role.Admin, undefined]
    ])(
      "for `%s` role raises `%s` error",
      async (role, expectedErrorMessage) => {
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

        if (expectedErrorMessage) {
          expect(res.errors).not.toBe(undefined);
          expect(res.errors![0].message).toBe(expectedErrorMessage);
        } else {
          expect(res.errors).toBe(undefined);
          expect(res.data).toMatchObject({
            users: [
              { id: expect.any(String), email: currentUser!.email },
              { id: expect.any(String), email: otherUser.email }
            ]
          });
        }
      }
    );
  });
});
