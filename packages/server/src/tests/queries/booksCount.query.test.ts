import { gql } from "apollo-server-express";

import { createBook } from "../factories";
import { getTestClient } from "../hepers";

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
  expect(res.errors).toBe(undefined);
  expect(res.data).toEqual({
    booksCount: 2
  });
});
