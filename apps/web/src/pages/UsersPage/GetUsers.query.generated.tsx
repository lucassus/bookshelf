import * as Types from "../../types.generated";

import {
  UserCard_PublicUser_Fragment,
  UserCard_ProtectedUser_Fragment
} from "../../components/UserCard/UserCard.fragment.generated";
import { gql } from "@apollo/client";
import { UserCardFragmentDoc } from "../../components/UserCard/UserCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetUsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUsersQuery = { __typename?: "Query" } & {
  users: Array<
    | ({ __typename?: "PublicUser" } & Pick<Types.PublicUser, "id"> &
        UserCard_PublicUser_Fragment)
    | ({ __typename?: "ProtectedUser" } & Pick<Types.ProtectedUser, "id"> &
        UserCard_ProtectedUser_Fragment)
  >;
};

export const GetUsersDocument = gql`
  query GetUsers {
    users {
      id
      ...UserCard
    }
  }
  ${UserCardFragmentDoc}
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>
) {
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
