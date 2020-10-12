import * as Types from "../../types.generated";

import { CurrentUserFragment } from "./CurrentUser.fragment.generated";
import { gql } from "@apollo/client";
import { CurrentUserFragmentDoc } from "./CurrentUser.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetCurrentUserQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetCurrentUserQuery = { __typename?: "Query" } & {
  currentUser:
    | { __typename: "GuestUser" }
    | ({ __typename: "ProtectedUser" } & CurrentUserFragment);
};

export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    currentUser {
      __typename
      ... on ProtectedUser {
        ...CurrentUser
      }
    }
  }
  ${CurrentUserFragmentDoc}
`;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    baseOptions
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    baseOptions
  );
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
