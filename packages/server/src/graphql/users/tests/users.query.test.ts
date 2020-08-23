import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";
import { Role } from "../../resolvers-types.generated";

describe("users query", () => {
  it("fetches users", async () => {
    // Given
    const userLuke = await createUser({ name: "Luke" });
    const userBob = await createUser({ name: "Bob" });
    const userAlice = await createUser({ name: "Alice" });

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
          name: userAlice.name,
          info: userAlice.info
        },
        {
          id: expect.any(String),
          name: userBob.name,
          info: userBob.info
        },
        {
          id: expect.any(String),
          name: userLuke.name,
          info: userLuke.info
        }
      ]
    });
  });

  describe("fetching protected fields", () => {
    test.each<[undefined | Role, undefined | string]>([
      [undefined, "Unauthorized access! Please log in."],
      [Role.User, "Unauthorized access! Please log in as admin."],
      [Role.Admin, undefined]
    ])(
      "for `%s` role raises `%s` error",
      async (role, expectedErrorMessage) => {
        // Given
        const currentUser = role
          ? await createUser({ name: "Anna", isAdmin: role === Role.Admin })
          : undefined;
        const otherUser = await createUser({ name: "Bob", isAdmin: false });

        // When
        const res = await createTestClient({ currentUser }).query({
          query: gql`
            query {
              users {
                id
                email
                isAdmin
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
              {
                id: expect.any(String),
                email: currentUser!.email,
                isAdmin: true
              },
              { id: expect.any(String), email: otherUser.email, isAdmin: false }
            ]
          });
        }
      }
    );
  });
});
