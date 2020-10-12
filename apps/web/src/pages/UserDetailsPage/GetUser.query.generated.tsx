import * as Types from "../../types.generated";

import { BookCopyCardFragment } from "../../components/BookCopyCard/BookCopyCard.fragment.generated";
import {
  UserCard_ProtectedUser_Fragment,
  UserCard_PublicUser_Fragment
} from "../../components/UserCard/UserCard.fragment.generated";
import { gql } from "@apollo/client";
import { BookCopyCardFragmentDoc } from "../../components/BookCopyCard/BookCopyCard.fragment.generated";
import { UserCardFragmentDoc } from "../../components/UserCard/UserCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetUserQueryVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
}>;

export type GetUserQuery = { __typename?: "Query" } & {
  user:
    | ({ __typename: "PublicUser" } & Pick<Types.PublicUser, "id" | "info"> & {
          ownedBookCopies: Array<
            { __typename?: "BookCopy" } & BookCopyCardFragment
          >;
        } & UserCard_PublicUser_Fragment)
    | ({ __typename: "ProtectedUser" } & Pick<
        Types.ProtectedUser,
        "id" | "info"
      > & {
          borrowedBookCopies: Array<
            { __typename?: "BookCopy" } & BookCopyCardFragment &
              BookCopyCardFragment
          >;
          ownedBookCopies: Array<
            { __typename?: "BookCopy" } & BookCopyCardFragment
          >;
        } & UserCard_ProtectedUser_Fragment)
    | ({ __typename: "ResourceNotFoundError" } & Pick<
        Types.ResourceNotFoundError,
        "message"
      >);
};

export const GetUserDocument = gql`
  query GetUser($id: ExternalID!) {
    user(id: $id) {
      __typename
      ... on ResourceNotFoundError {
        message
      }
      ... on User {
        id
        info
        ownedBookCopies {
          ...BookCopyCard
        }
        ...UserCard
        ... on ProtectedUser {
          borrowedBookCopies {
            ...BookCopyCard
            ...BookCopyCard
          }
        }
      }
    }
  }
  ${BookCopyCardFragmentDoc}
  ${UserCardFragmentDoc}
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    baseOptions
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    baseOptions
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
