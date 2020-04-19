import { gql } from "apollo-server";
import { createTestClient } from "apollo-server-testing";

import { server } from "./server";

it("fetches the message", async () => {
  // Given
  const { query } = createTestClient(server);

  const MESSAGE_QUERY = gql`
    query getMessage {
      message
    }
  `;

  // When
  const res = await query({ query: MESSAGE_QUERY });

  // Then
  expect(res.data.message).toEqual("Hello World!");
});
