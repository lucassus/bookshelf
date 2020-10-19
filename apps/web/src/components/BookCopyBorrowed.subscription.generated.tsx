import * as Types from "../types.generated";

import { BookCopyCardFragment } from "./BookCopyCard/BookCopyCard.fragment.generated";
import { gql } from "@apollo/client";
import { BookCopyCardFragmentDoc } from "./BookCopyCard/BookCopyCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type BookCopyBorrowedSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type BookCopyBorrowedSubscription = { __typename?: "Subscription" } & {
  bookCopyBorrowed: { __typename?: "BookCopy" } & BookCopyCardFragment;
};

export const BookCopyBorrowedDocument = gql`
  subscription BookCopyBorrowed {
    bookCopyBorrowed {
      ...BookCopyCard
    }
  }
  ${BookCopyCardFragmentDoc}
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
