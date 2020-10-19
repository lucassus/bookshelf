import * as Types from "../types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type BookCopyBorrowedSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type BookCopyBorrowedSubscription = { __typename?: "Subscription" } & {
  bookCopyBorrowed: { __typename?: "BookCopy" } & Pick<
    Types.BookCopy,
    "id" | "borrowedAt"
  > & {
      book: { __typename?: "Book" } & Pick<Types.Book, "id" | "title">;
      owner:
        | ({ __typename?: "PublicUser" } & Pick<
            Types.PublicUser,
            "id" | "name"
          >)
        | ({ __typename?: "ProtectedUser" } & Pick<
            Types.ProtectedUser,
            "id" | "name"
          >);
      borrower: Types.Maybe<
        | ({ __typename?: "PublicUser" } & Pick<
            Types.PublicUser,
            "id" | "name"
          >)
        | ({ __typename?: "ProtectedUser" } & Pick<
            Types.ProtectedUser,
            "id" | "name"
          >)
      >;
    };
};

export const BookCopyBorrowedDocument = gql`
  subscription BookCopyBorrowed {
    bookCopyBorrowed {
      id
      book {
        id
        title
      }
      owner {
        id
        name
      }
      borrower {
        id
        name
      }
      borrowedAt
    }
  }
`;

/**
 * __useBookCopyBorrowedSubscription__
 *
 * To run a query within a React component, call `useBookCopyBorrowedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBookCopyBorrowedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookCopyBorrowedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useBookCopyBorrowedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    BookCopyBorrowedSubscription,
    BookCopyBorrowedSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    BookCopyBorrowedSubscription,
    BookCopyBorrowedSubscriptionVariables
  >(BookCopyBorrowedDocument, baseOptions);
}
export type BookCopyBorrowedSubscriptionHookResult = ReturnType<
  typeof useBookCopyBorrowedSubscription
>;
export type BookCopyBorrowedSubscriptionResult = Apollo.SubscriptionResult<
  BookCopyBorrowedSubscription
>;
