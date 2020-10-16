import * as Types from "../../types.generated";

import { gql } from "@apollo/client";
export type FavouriteBookButtonFragment = { __typename: "Book" } & Pick<
  Types.Book,
  "id" | "isFavourite"
>;

export const FavouriteBookButtonFragmentDoc = gql`
  fragment FavouriteBookButton on Book {
    __typename
    id
    isFavourite
  }
`;
