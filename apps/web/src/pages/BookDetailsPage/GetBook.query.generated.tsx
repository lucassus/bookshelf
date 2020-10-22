import * as Types from "../../types.generated";

import { FavouriteBookButtonFragment } from "../../components/FavouriteBookButton/FavouriteBookButton.fragment.generated";
import { BookCopyCardFragment } from "../../components/BookCopyCard/BookCopyCard.fragment.generated";
import { gql } from "@apollo/client";
import { FavouriteBookButtonFragmentDoc } from "../../components/FavouriteBookButton/FavouriteBookButton.fragment.generated";
import { BookCopyCardFragmentDoc } from "../../components/BookCopyCard/BookCopyCard.fragment.generated";
import * as Apollo from "@apollo/client";
export type GetBookQueryVariables = Types.Exact<{
  id: Types.Scalars["ExternalID"];
}>;

export type GetBookQuery = { __typename?: "Query" } & {
  book:
    | ({ __typename: "Book" } & Pick<
        Types.Book,
        "id" | "title" | "description"
      > & {
          author: { __typename?: "Author" } & Pick<Types.Author, "id" | "name">;
          cover: { __typename?: "Image" } & Pick<Types.Image, "path">;
          copies: Array<{ __typename?: "BookCopy" } & BookCopyCardFragment>;
        } & FavouriteBookButtonFragment)
    | ({ __typename: "ResourceNotFoundError" } & Pick<
        Types.ResourceNotFoundError,
        "message"
      >);
};

export const GetBookDocument = gql`
  query GetBook($id: ExternalID!) {
    book(id: $id) {
      __typename
      ... on ResourceNotFoundError {
        message
      }
      ... on Book {
        id
        title
        description
        ...FavouriteBookButton
        author {
          id
          name
        }
        cover {
          path
        }
        copies {
          ...BookCopyCard
        }
      }
    }
  }
  ${FavouriteBookButtonFragmentDoc}
  ${BookCopyCardFragmentDoc}
`;

/**
 * __useGetBookQuery__
 *
 * To run a query within a React component, call `useGetBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBookQuery, GetBookQueryVariables>
) {
  return Apollo.useQuery<GetBookQuery, GetBookQueryVariables>(
    GetBookDocument,
    baseOptions
  );
}
export function useGetBookLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBookQuery, GetBookQueryVariables>
) {
  return Apollo.useLazyQuery<GetBookQuery, GetBookQueryVariables>(
    GetBookDocument,
    baseOptions
  );
}
export type GetBookQueryHookResult = ReturnType<typeof useGetBookQuery>;
export type GetBookLazyQueryHookResult = ReturnType<typeof useGetBookLazyQuery>;
export type GetBookQueryResult = Apollo.QueryResult<
  GetBookQuery,
  GetBookQueryVariables
>;
