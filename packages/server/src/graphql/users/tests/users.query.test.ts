import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createUser } from "../../../testUtils/factories";

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

  // TODO: Idea: refactor with jest.each
  describe("fetching email fields", () => {
    const GetUsersWithEmails = gql`
      query {
        users {
          id
          name
          email
        }
      }
    `;

    it("return users with emails when authenticated as admin", async () => {
      // Given
      const currentUser = await createUser({ isAdmin: true });
      const user = await createUser();

      // When
      const res = await createTestClient({ currentUser }).query({
        query: GetUsersWithEmails
      });

      // Then
      expect(res.errors).toBe(undefined);
      expect(res.data).not.toBe(null);
      expect(res.data).toMatchObject({
        users: [
          {
            id: expect.any(String),
            name: currentUser.name,
            email: currentUser.email
          },
          {
            id: expect.any(String),
            name: user.name,
            email: user.email
          }
        ]
      });
    });

    it("returns an error when not authenticated as admin", async () => {
      // Given
      const currentUser = await createUser({ isAdmin: false });

      // When
      const res = await createTestClient({ currentUser }).query({
        query: GetUsersWithEmails
      });

      // Then
      expect(res.errors).not.toBe(undefined);
      expect(res.errors![0].message).toBe(
        "Unauthorized access! Please log in as admin."
      );
    });
  });
});
