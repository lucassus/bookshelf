import * as Types from "../../types.generated";

import { BookCardFragment } from "../../components/BookCard/BookCard.fragment.generated";
import { gql } from "@apollo/client";
import { BookCardFragmentDoc } from "../../components/BookCard/BookCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetAuthorQueryVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
}>;

export type GetAuthorQuery = { __typename?: "Query" } & {
  author:
    | ({ __typename: "Author" } & Pick<Types.Author, "id" | "name" | "bio"> & {
          photo: { __typename?: "Image" } & Pick<Types.Image, "path">;
          books: Array<{ __typename?: "Book" } & BookCardFragment>;
        })
    | ({ __typename: "ResourceNotFoundError" } & Pick<
        Types.ResourceNotFoundError,
        "message"
      >);
};

export const GetAuthorDocument = gql`
  query GetAuthor($id: ExternalID!) {
    author(id: $id) {
      __typename
      ... on ResourceNotFoundError {
        message
      }
      ... on Author {
        id
        name
        bio
        photo {
          path
        }
        books {
          ...BookCard
        }
      }
    }
  }
  ${BookCardFragmentDoc}
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
  baseOptions?: Apollo.QueryHookOptions<GetAuthorQuery, GetAuthorQueryVariables>
) {
  return Apollo.useQuery<GetAuthorQuery, GetAuthorQueryVariables>(
    GetAuthorDocument,
    baseOptions
  );
}
export function useGetAuthorLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAuthorQuery,
    GetAuthorQueryVariables
  >
) {
  return Apollo.useLazyQuery<GetAuthorQuery, GetAuthorQueryVariables>(
    GetAuthorDocument,
    baseOptions
  );
}
export type GetAuthorQueryHookResult = ReturnType<typeof useGetAuthorQuery>;
export type GetAuthorLazyQueryHookResult = ReturnType<
  typeof useGetAuthorLazyQuery
>;
export type GetAuthorQueryResult = Apollo.QueryResult<
  GetAuthorQuery,
  GetAuthorQueryVariables
>;
