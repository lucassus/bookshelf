import { gql } from "apollo-server-express";

import { toExternalId } from "../../../common/secureId";
import { User } from "../../../database/entity";
import { createTestClient } from "../../../testUtils/createTestClient";
import { createBookCopy, createUser } from "../../../testUtils/factories";

describe("user query", () => {
  it("fetches a user", async () => {
    // Given
    const user = await createUser();
    await createBookCopy({ owner: user });
    await createBookCopy({ owner: user });
    await createBookCopy({ borrower: user });

    // When
    const res = await createTestClient().query({
      query: gql`
        query($id: ExternalID!) {
          user(id: $id) {
            ... on User {
              id
              name
              info
              avatar {
                ... on Avatar {
                  color
                  image {
                    url
                  }
                  flagged
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
          }
        }
      `,
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      user: {
        id: toExternalId(user),
        name: user.name,
        info: user.info,
        avatar: {
          flagged: false
        },
        ownedBookCopies: expect.any(Array),
        borrowedBookCopies: expect.any(Array)
      }
    });
  });

  it("fetches a user with flagged avatar", async () => {
    // Given
    const user = await createUser({ avatarAttributes: { flagged: true } });

    // When
    const res = await createTestClient().query({
      query: gql`
        query($id: ExternalID!) {
          user(id: $id) {
            ... on User {
              avatar {
                ... on FlaggedAvatarError {
                  __typename
                  message
                }
              }
            }
          }
        }
      `,
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
      query: gql`
        query($id: ExternalID!) {
          user(id: $id) {
            ... on ResourceNotFoundError {
              message
            }
          }
        }
      `,
      variables: { id: toExternalId(user) }
    });

    // Then
    expect(res.data).toEqual({
      user: {
        message: "Could not find User"
      }
    });
  });
});
