import * as Types from "../../types.generated";

import { FavouriteBookButtonFragment } from "../FavouriteBookButton/FavouriteBookButton.fragment.generated";
import { gql } from "@apollo/client";
import { FavouriteBookButtonFragmentDoc } from "../FavouriteBookButton/FavouriteBookButton.fragment.generated";
export type BookCardFragment = { __typename?: "Book" } & Pick<
  Types.Book,
  "id" | "title" | "isFavourite"
> & {
    cover: { __typename?: "Image" } & Pick<Types.Image, "url">;
    author: { __typename?: "Author" } & Pick<Types.Author, "id" | "name">;
  } & FavouriteBookButtonFragment;

export const BookCardFragmentDoc = gql`
  fragment BookCard on Book {
    id
    title
    isFavourite
    ...FavouriteBookButton
    cover {
      url
    }
    author {
      id
      name
    }
  }
  ${FavouriteBookButtonFragmentDoc}
`;
