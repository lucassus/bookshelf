import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { User } from "../../../database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createBookCopy, createUser } from "../../../testUtils/factories";

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
        }

        ... on ClassifiedUser {
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

  it("fetches a user with privileged fields", async () => {
    // Given
    const user = await createUser();
    await createBookCopy({ borrower: user });

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
        borrowedBookCopies: expect.any(Array)
      }
    });
  });

  // TODO: Dry it or refactor
  it("fetches a user with privileged fields 2", async () => {
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
