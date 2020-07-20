import { gql } from "apollo-server-express";

import { createBook } from "../../../tests/factories";
import { getTestClient } from "../../../tests/hepers";

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
