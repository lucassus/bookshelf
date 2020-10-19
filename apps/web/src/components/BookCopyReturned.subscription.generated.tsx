import * as Types from "../types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type BookCopyReturnedSubscriptionVariables = Types.Exact<{
  [key: string]: never;
}>;

export type BookCopyReturnedSubscription = { __typename?: "Subscription" } & {
  bookCopyReturned: { __typename?: "BookCopy" } & Pick<
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

export const BookCopyReturnedDocument = gql`
  subscription BookCopyReturned {
    bookCopyReturned {
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
 * __useBookCopyReturnedSubscription__
 *
 * To run a query within a React component, call `useBookCopyReturnedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBookCopyReturnedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookCopyReturnedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useBookCopyReturnedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    BookCopyReturnedSubscription,
    BookCopyReturnedSubscriptionVariables
  >
) {
  return Apollo.useSubscription<
    BookCopyReturnedSubscription,
    BookCopyReturnedSubscriptionVariables
  >(BookCopyReturnedDocument, baseOptions);
}
export type BookCopyReturnedSubscriptionHookResult = ReturnType<
  typeof useBookCopyReturnedSubscription
>;
export type BookCopyReturnedSubscriptionResult = Apollo.SubscriptionResult<
  BookCopyReturnedSubscription
>;
