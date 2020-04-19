import { ApolloServer, gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";

import { rootValue } from "./rootValue";
import { typeDefs } from "./typeDefs";

it("fetches the message", async () => {
  const server = new ApolloServer({
    typeDefs,
    rootValue,
  });

  const { query } = createTestClient(server);

  const MESSAGE_QUERY = gql`
    query getMessage {
      message
    }
  `;

  const res = await query({ query: MESSAGE_QUERY });
  expect(res.data.message).toEqual("Hello World!");
});
