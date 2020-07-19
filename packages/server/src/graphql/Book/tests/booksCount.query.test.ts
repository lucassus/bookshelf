import { gql } from "apollo-server-express";

import { createBook } from "../../../database/factories";
import { getTestClient } from "../../../testHelpers";

test("booksCount query", async () => {
  // Given
  await createBook();
  await createBook();

  // When
  const res = await getTestClient().query({
    query: gql`
      query {
        booksCount
      }
    `
  });

  // Then
  expect(res.data).toEqual({
    booksCount: 2
  });
});
