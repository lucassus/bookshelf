import { gql } from "apollo-server-express";

import { createAuthor, createBook } from "../../../../infra/factories";
import { createTestClient } from "../../createTestClient";

test("authors query", async () => {
  // Given
  const firstAuthor = await createAuthor();
  await createBook({ author: firstAuthor });
  await createBook({ author: firstAuthor });
  await createBook({ author: firstAuthor });

  const secondAuthor = await createAuthor();
  await createBook({ author: secondAuthor });
  await createBook({ author: secondAuthor });

  // When
  const res = await createTestClient().query({
    query: gql`
      query {
        authors {
          id
          name
          books {
            id
            title
            description
          }
        }
      }
    `
  });

  // Then
  expect(res.data).not.toBeNull();
  expect(res.data).toMatchSnapshot();
});
