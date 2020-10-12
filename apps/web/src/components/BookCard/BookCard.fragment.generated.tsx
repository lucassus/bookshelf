import * as Types from "../../types.generated";

import { gql } from "@apollo/client";
export type BookCardFragment = { __typename?: "Book" } & Pick<
  Types.Book,
  "id" | "title" | "favourite"
> & {
    cover: { __typename?: "Image" } & Pick<Types.Image, "url">;
    author: { __typename?: "Author" } & Pick<Types.Author, "id" | "name">;
  };

export const BookCardFragmentDoc = gql`
  fragment BookCard on Book {
    id
    title
    favourite
    cover {
      url
    }
    author {
      id
      name
    }
  }
`;
