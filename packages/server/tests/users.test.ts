import { ApolloServer, gql } from "apollo-server-express";
import { createTestClient } from "apollo-server-testing";
import { getConnection } from "typeorm";

import { User } from "../src/database/entity/User";
import { secureId } from "../src/database/helpers";
import { loadFixtures } from "../src/fixtures";
import { createServer } from "../src/server";

let server: ApolloServer;

beforeEach(async () => {
  await loadFixtures();
  server = createServer();
});

it("fetches users", async () => {
  const { query } = createTestClient(server);

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
  const user = await getConnection().manager.findOneOrFail(User, {
    name: "Bob"
  });

  // When
  const res = await query({
    query: gql`
      query GetUser($id: ID!) {
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
