import { gql } from "apollo-server-express";
import { getConnection } from "typeorm";

import { User } from "../../../../infra/database/entity";
import {
  createBook,
  createBookCopy,
  createUser
} from "../../../../infra/factories";
import { toExternalId } from "../../../../infra/support/secureId";
import { createTestClient } from "../../createTestClient";

describe("user query", () => {
  const GetUserQuery = gql`
    query($id: ExternalID!) {
      user(id: $id) {
        __typename

        ... on User {
          id
          name
          info

          avatar {
            __typename
            ... on Avatar {
              color
              image {
                url
              }
            }
            ... on FlaggedAvatarError {
              message
            }
          }

          ownedBookCopies {
            book {
              id
              title
            }
            owner {
              id
              name
            }
          }

          ... on ProtectedUser {
            email
            isAdmin

            borrowedBookCopies {
              borrower {
                id
                name
              }
              book {
                id
                title
              }
            }

            favouriteBooks {
              id
              title
            }
          }
        }

        ... on ResourceNotFoundError {
          message
        }
      }
    }
  `;

  it("fetches a user", async () => {
    // Given
    const user = await createUser();
    await createBookCopy({ owner: user });
    await createBookCopy({ owner: user });
    await createBookCopy({ borrower: user });

    // When
    const res = await createTestClient().query({
      query: GetUserQuery,
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      user: {
        id: toExternalId(user),
        name: user.name,
        info: user.info,
        avatar: { color: expect.any(String) },
        ownedBookCopies: expect.any(Array)
      }
    });
  });

  describe("fetching the current user", () => {
    it("fetches a user with protected fields", async () => {
      // Given
      const book = await createBook();
      const user = await createUser();

      user.favouriteBooks = Promise.resolve([book]);
      await getConnection().manager.save(user);

      await createBookCopy({ borrower: user, book });

      // When
      const res = await createTestClient({ currentUser: user }).query({
        query: GetUserQuery,
        variables: { id: toExternalId(user) }
      });

      // Then
      expect(res.errors).toBe(undefined);
      expect(res.data).toMatchObject({
        user: {
          id: toExternalId(user),
          name: user.name,
          info: user.info,
          email: user.email,
          isAdmin: false,
          borrowedBookCopies: expect.any(Array),
          favouriteBooks: [
            {
              id: toExternalId(book),
              title: book.title
            }
          ]
        }
      });
    });
  });

  describe("fetching as admin user", () => {
    it("fetches a user with privileged fields", async () => {
      // Given
      const adminUser = await createUser({ isAdmin: true });
      const user = await createUser();
      await createBookCopy({ borrower: user });

      // When
      const res = await createTestClient({ currentUser: adminUser }).query({
        query: GetUserQuery,
        variables: { id: toExternalId(user) }
      });

      // Then
      expect(res.errors).toBe(undefined);
      expect(res.data).toMatchObject({
        user: {
          id: toExternalId(user),
          name: user.name,
          info: user.info,
          email: user.email,
          isAdmin: false,
          borrowedBookCopies: expect.any(Array)
        }
      });
    });
  });

  it("fetches a user with flagged avatar", async () => {
    // Given
    const user = await createUser({ avatarAttributes: { flagged: true } });

    // When
    const res = await createTestClient().query({
      query: GetUserQuery,
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      user: {
        avatar: {
          __typename: "FlaggedAvatarError",
          message: "Avatar is flagged!"
        }
      }
    });
  });

  it("responds with error when user cannot be found", async () => {
    // Given
    const user = new User();
    user.id = 1234;

    // When
    const res = await createTestClient().query({
      query: GetUserQuery,
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.data).toEqual({
      user: {
        __typename: "ResourceNotFoundError",
        message: "Could not find User"
      }
    });
  });
});
