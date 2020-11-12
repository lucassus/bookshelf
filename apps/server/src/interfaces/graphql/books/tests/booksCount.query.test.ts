import { gql } from "apollo-server-express";

import { createBook } from "../../../../infra/factories";
import { createTestClient } from "../../createTestClient";

test("booksCount query", async () => {
  // Given
  await createBook();
  await createBook();

  // When
  const res = await createTestClient().query({
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
