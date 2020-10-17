import * as Types from "../../types.generated";

import {
  ResourceCard_Author_Fragment,
  ResourceCard_Book_Fragment,
  ResourceCard_PublicUser_Fragment,
  ResourceCard_ProtectedUser_Fragment
} from "./ResourceCard.fragment.generated";
import { gql } from "@apollo/client";
import { ResourceCardFragmentDoc } from "./ResourceCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetResourcesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetResourcesQuery = { __typename?: "Query" } & {
  resources: Array<
    | ({ __typename?: "Author" } & ResourceCard_Author_Fragment)
    | ({ __typename?: "Book" } & ResourceCard_Book_Fragment)
    | ({ __typename?: "PublicUser" } & ResourceCard_PublicUser_Fragment)
    | ({ __typename?: "ProtectedUser" } & ResourceCard_ProtectedUser_Fragment)
  >;
};

export const GetResourcesDocument = gql`
  query GetResources {
    resources {
      ...ResourceCard
    }
  }
  ${ResourceCardFragmentDoc}
`;

/**
 * __useGetResourcesQuery__
 *
 * To run a query within a React component, call `useGetResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetResourcesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetResourcesQuery,
    GetResourcesQueryVariables
  >
) {
  return Apollo.useQuery<GetResourcesQuery, GetResourcesQueryVariables>(
    GetResourcesDocument,
    baseOptions
  );
}
export function useGetResourcesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetResourcesQuery,
    GetResourcesQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetResourcesQuery, GetResourcesQueryVariables>(
    GetResourcesDocument,
    baseOptions
  );
}
export type GetResourcesQueryHookResult = ReturnType<
  typeof useGetResourcesQuery
>;
export type GetResourcesLazyQueryHookResult = ReturnType<
  typeof useGetResourcesLazyQuery
>;
export type GetResourcesQueryResult = Apollo.QueryResult<
  GetResourcesQuery,
  GetResourcesQueryVariables
>;
