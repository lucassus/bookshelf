import * as Types from "../../types.generated";

import {
  BookCopyUser_ProtectedUser_Fragment,
  BookCopyUser_PublicUser_Fragment
} from "./BookCopyUserFragment.generated";
import { gql } from "@apollo/client";
import { BookCopyUserFragmentDoc } from "./BookCopyUserFragment.generated";
export type BookCopyCardFragment = { __typename: "BookCopy" } & Pick<
  Types.BookCopy,
  "id" | "borrowedAt"
> & {
    book: { __typename?: "Book" } & Pick<Types.Book, "title" | "id"> & {
        cover: { __typename?: "Image" } & Pick<Types.Image, "url">;
      };
    owner:
      | ({ __typename?: "ProtectedUser" } & BookCopyUser_ProtectedUser_Fragment)
      | ({ __typename?: "PublicUser" } & BookCopyUser_PublicUser_Fragment);
    borrower?: Types.Maybe<
      | ({ __typename?: "ProtectedUser" } & BookCopyUser_ProtectedUser_Fragment)
      | ({ __typename?: "PublicUser" } & BookCopyUser_PublicUser_Fragment)
    >;
  };

export const BookCopyCardFragmentDoc = gql`
  fragment BookCopyCard on BookCopy {
    __typename
    id
    book {
      title
      id
      cover {
        url
      }
    }
    owner {
      ...BookCopyUser
    }
    borrower {
      ...BookCopyUser
    }
    borrowedAt
  }
  ${BookCopyUserFragmentDoc}
`;
