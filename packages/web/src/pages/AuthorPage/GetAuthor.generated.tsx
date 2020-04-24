import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";

import * as Types from "../../types.generated";

export type GetAuthorQueryVariables = {
  id: Types.Scalars["Int"];
};

export type GetAuthorQuery = { __typename?: "Query" } & {
  author?: Types.Maybe<
    { __typename?: "Author" } & Pick<Types.Author, "name"> & {
        books?: Types.Maybe<
          Array<
            Types.Maybe<
              { __typename?: "Book" } & Pick<Types.Book, "id" | "title"> & {
                  cover: { __typename?: "Image" } & Pick<Types.Image, "url">;
                }
            >
          >
        >;
      }
  >;
};

export const GetAuthorDocument = gql`
  query GetAuthor($id: Int!) {
    author(id: $id) {
      name
      books {
        id
        title
        cover {
          url
        }
      }
    }
  }
`;

/**
 * __useGetAuthorQuery__
 *
 * To run a query within a React component, call `useGetAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAuthorQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAuthorQuery,
    GetAuthorQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetAuthorQuery, GetAuthorQueryVariables>(
    GetAuthorDocument,
    baseOptions
  );
}
export function useGetAuthorLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAuthorQuery,
    GetAuthorQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetAuthorQuery, GetAuthorQueryVariables>(
    GetAuthorDocument,
    baseOptions
  );
}
export type GetAuthorQueryHookResult = ReturnType<typeof useGetAuthorQuery>;
export type GetAuthorLazyQueryHookResult = ReturnType<
  typeof useGetAuthorLazyQuery
>;
export type GetAuthorQueryResult = ApolloReactCommon.QueryResult<
  GetAuthorQuery,
  GetAuthorQueryVariables
>;
