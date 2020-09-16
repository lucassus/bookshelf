import { gql } from "apollo-server-express";

import { createTestClient } from "../../../testUtils/createTestClient";
import { createBook } from "../../../testUtils/factories";

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
