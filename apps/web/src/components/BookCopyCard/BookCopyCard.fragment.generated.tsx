import * as Types from "../../types.generated";

import {
  BookCopyUser_PublicUser_Fragment,
  BookCopyUser_ProtectedUser_Fragment
} from "./BookCopyUserFragment.generated";
import { gql } from "@apollo/client";
import { BookCopyUserFragmentDoc } from "./BookCopyUserFragment.generated";
export type BookCopyCardFragment = { __typename: "BookCopy" } & Pick<
  Types.BookCopy,
  "id" | "borrowedAt"
> & {
    book: { __typename?: "Book" } & Pick<Types.Book, "title" | "id"> & {
        cover: { __typename?: "Image" } & Pick<Types.Image, "path">;
      };
    owner:
      | ({ __typename?: "PublicUser" } & BookCopyUser_PublicUser_Fragment)
      | ({
          __typename?: "ProtectedUser";
        } & BookCopyUser_ProtectedUser_Fragment);
    borrower: Types.Maybe<
      | ({ __typename?: "PublicUser" } & BookCopyUser_PublicUser_Fragment)
      | ({ __typename?: "ProtectedUser" } & BookCopyUser_ProtectedUser_Fragment)
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
        path
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
