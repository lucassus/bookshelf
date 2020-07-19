import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";

import { createBookCopy, createUser } from "../src/database/factories";
import { secureId } from "../src/database/helpers";
import { createServer } from "../src/server";

let server: ApolloServer;

beforeEach(async () => {
  server = createServer();
});

it("fetches users", async () => {
  const { query } = createTestClient(server);

  await createUser();
  await createUser();
  await createUser();

  // When
  const res = await query({
    query: gql`
      query {
        users {
          name
          email
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
  expect(res.data).not.toBeNull();
  expect(res.data!.users).toMatchSnapshot();
});

it("fetches a user", async () => {
  const { query } = createTestClient(server);

  const user = await createUser();
  await createBookCopy({ ownerId: user.id });
  await createBookCopy({ ownerId: user.id });
  await createBookCopy({ borrowerId: user.id });

  // When
  const res = await query({
    query: gql`
      query($id: ID!) {
        user(id: $id) {
          name
          email
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
              email
            }
          }
          borrowedBookCopies {
            borrower {
              id
              name
              email
            }
            book {
              id
              title
            }
          }
        }
      }
    `,
    variables: { id: secureId.toExternal(user.id, "User") }
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data!.user).toMatchSnapshot();
});
