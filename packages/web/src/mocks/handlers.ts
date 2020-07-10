import { graphql } from "msw";

import { createAuthor } from "../testUtils/factories";

export const handlers = [
  graphql.query("GetAuthors", (req, res, ctx) =>
    res(
      ctx.data({
        authors: [
          {
            __typename: "Author",
            ...createAuthor({ id: "1", name: "J. K. Rowling" })
          },
          {
            __typename: "Author",
            ...createAuthor({ id: "2", name: "Andrzej Sapkowski" })
          }
        ]
      })
    )
  )
];
