import * as Types from "../../types.generated";

import { BookCopyCardFragment } from "../../components/BookCopyCard/BookCopyCard.fragment.generated";
import { gql } from "@apollo/client";
import { BookCopyCardFragmentDoc } from "../../components/BookCopyCard/BookCopyCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetMyBookCopiesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetMyBookCopiesQuery = { __typename?: "Query" } & {
  currentUser: Types.Maybe<
    { __typename: "ProtectedUser" } & Pick<Types.ProtectedUser, "id"> & {
        ownedBookCopies: Array<
          { __typename?: "BookCopy" } & BookCopyCardFragment
        >;
        borrowedBookCopies: Array<
          { __typename?: "BookCopy" } & BookCopyCardFragment
        >;
      }
  >;
};

export const GetMyBookCopiesDocument = gql`
  query GetMyBookCopies {
    currentUser {
      __typename
      id
      ownedBookCopies {
        ...BookCopyCard
      }
      borrowedBookCopies {
        ...BookCopyCard
      }
    }
  }
  ${BookCopyCardFragmentDoc}
`;

/**
 * __useGetMyBookCopiesQuery__
 *
 * To run a query within a React component, call `useGetMyBookCopiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBookCopiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBookCopiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyBookCopiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyBookCopiesQuery,
    GetMyBookCopiesQueryVariables
  >
) {
  return Apollo.useQuery<GetMyBookCopiesQuery, GetMyBookCopiesQueryVariables>(
    GetMyBookCopiesDocument,
    baseOptions
  );
}
export function useGetMyBookCopiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyBookCopiesQuery,
    GetMyBookCopiesQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    GetMyBookCopiesQuery,
    GetMyBookCopiesQueryVariables
  >(GetMyBookCopiesDocument, baseOptions);
}
export type GetMyBookCopiesQueryHookResult = ReturnType<
  typeof useGetMyBookCopiesQuery
>;
export type GetMyBookCopiesLazyQueryHookResult = ReturnType<
  typeof useGetMyBookCopiesLazyQuery
>;
export type GetMyBookCopiesQueryResult = Apollo.QueryResult<
  GetMyBookCopiesQuery,
  GetMyBookCopiesQueryVariables
>;
