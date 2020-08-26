import { gql } from "apollo-server-express";

import { secureId } from "../../../common/secureId";
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
    const id = secureId.toExternal(user.id, "User");
    const res = await createTestClient().query({
      query: gql`
        query($id: ExternalID!) {
          user(id: $id) {
            ... on User {
              id
              name
              info
              avatar {
                color
                image {
                  url
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
      variables: { id }
    });

    // Then
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchObject({
      user: {
        id,
        name: user.name,
        info: user.info,
        ownedBookCopies: expect.any(Array),
        borrowedBookCopies: expect.any(Array)
      }
    });
  });

  it("responds with error when user cannot be found", async () => {
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
      variables: { id: secureId.toExternal(1, "User") }
    });

    // Then
    expect(res.data).toEqual({
      user: {
        message: 'Could not find any entity of type "User" matching: "1"'
      }
    });
  });
});
