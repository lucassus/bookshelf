import * as Types from "../../types.generated";

import { BookCopyCardFragment } from "./BookCopyCard.fragment.generated";
import { gql } from "@apollo/client";
import { BookCopyCardFragmentDoc } from "./BookCopyCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type BookCopyUpdatedSubscriptionVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
}>;

export type BookCopyUpdatedSubscription = { __typename?: "Subscription" } & {
  bookCopyUpdated: { __typename?: "BookCopy" } & BookCopyCardFragment;
};

export const BookCopyUpdatedDocument = gql`
  subscription BookCopyUpdated($id: ExternalID!) {
    bookCopyUpdated(id: $id) {
      ...BookCopyCard
    }
  }
  ${BookCopyCardFragmentDoc}
`;

/**
 * __useBookCopyUpdatedSubscription__
 *
 * To run a query within a React component, call `useBookCopyUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBookCopyUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookCopyUpdatedSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookCopyUpdatedSubscription(
  baseOptions: Apollo.SubscriptionHookOptions<
    BookCopyUpdatedSubscription,
    BookCopyUpdatedSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    BookCopyUpdatedSubscription,
    BookCopyUpdatedSubscriptionVariables
  >(BookCopyUpdatedDocument, baseOptions);
}
export type BookCopyUpdatedSubscriptionHookResult = ReturnType<
  typeof useBookCopyUpdatedSubscription
>;
export type BookCopyUpdatedSubscriptionResult = Apollo.SubscriptionResult<
  BookCopyUpdatedSubscription
>;
