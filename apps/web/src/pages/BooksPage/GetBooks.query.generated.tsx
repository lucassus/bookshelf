import * as Types from "../../types.generated";

import { BookCardFragment } from "../../components/BookCard/BookCard.fragment.generated";
import { gql } from "@apollo/client";
import { BookCardFragmentDoc } from "../../components/BookCard/BookCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetBooksQueryVariables = Types.Exact<{
  limit?: Types.Maybe<Types.Scalars["Int"]>;
  offset?: Types.Maybe<Types.Scalars["Int"]>;
}>;

export type GetBooksQuery = { __typename?: "Query" } & Pick<
  Types.Query,
  "booksCount"
> & { books: Array<{ __typename?: "Book" } & BookCardFragment> };

export const GetBooksDocument = gql`
  query GetBooks($limit: Int, $offset: Int) {
    booksCount
    books(limit: $limit, offset: $offset) {
      ...BookCard
    }
  }
  ${BookCardFragmentDoc}
`;

/**
 * __useGetBooksQuery__
 *
 * To run a query within a React component, call `useGetBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBooksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetBooksQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>
) {
  return Apollo.useQuery<GetBooksQuery, GetBooksQueryVariables>(
    GetBooksDocument,
    baseOptions
  );
}
export function useGetBooksLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBooksQuery,
    GetBooksQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(
    GetBooksDocument,
    baseOptions
  );
}
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<
  typeof useGetBooksLazyQuery
>;
export type GetBooksQueryResult = Apollo.QueryResult<
  GetBooksQuery,
  GetBooksQueryVariables
>;
