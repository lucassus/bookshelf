import * as Types from "../../types.generated";

import { AuthorCardFragment } from "../../components/AuthorCard/AuthorCard.fragment.generated";
import { gql } from "@apollo/client";
import { AuthorCardFragmentDoc } from "../../components/AuthorCard/AuthorCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetAuthorsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetAuthorsQuery = { __typename?: "Query" } & {
  authors: Array<{ __typename?: "Author" } & AuthorCardFragment>;
};

export const GetAuthorsDocument = gql`
  query GetAuthors {
    authors {
      ...AuthorCard
    }
  }
  ${AuthorCardFragmentDoc}
`;

/**
 * __useGetAuthorsQuery__
 *
 * To run a query within a React component, call `useGetAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAuthorsQuery,
    GetAuthorsQueryVariables
  >
) {
  return Apollo.useQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(
    GetAuthorsDocument,
    baseOptions
  );
}
export function useGetAuthorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAuthorsQuery,
    GetAuthorsQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(
    GetAuthorsDocument,
    baseOptions
  );
}
export type GetAuthorsQueryHookResult = ReturnType<typeof useGetAuthorsQuery>;
export type GetAuthorsLazyQueryHookResult = ReturnType<
  typeof useGetAuthorsLazyQuery
>;
export type GetAuthorsQueryResult = Apollo.QueryResult<
  GetAuthorsQuery,
  GetAuthorsQueryVariables
>;
