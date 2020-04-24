import * as Types from '../../generated/graphql';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type GetAuthorsQueryVariables = {};


export type GetAuthorsQuery = (
  { __typename?: 'Query' }
  & { authors: Array<(
    { __typename?: 'Author' }
    & Pick<Types.Author, 'id' | 'name'>
    & { photo: (
      { __typename?: 'Image' }
      & Pick<Types.Image, 'url'>
    ) }
  )> }
);


export const GetAuthorsDocument = gql`
    query GetAuthors {
  authors {
    id
    name
    photo {
      url
    }
  }
}
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
export function useGetAuthorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, baseOptions);
      }
export function useGetAuthorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAuthorsQuery, GetAuthorsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAuthorsQuery, GetAuthorsQueryVariables>(GetAuthorsDocument, baseOptions);
        }
export type GetAuthorsQueryHookResult = ReturnType<typeof useGetAuthorsQuery>;
export type GetAuthorsLazyQueryHookResult = ReturnType<typeof useGetAuthorsLazyQuery>;
export type GetAuthorsQueryResult = ApolloReactCommon.QueryResult<GetAuthorsQuery, GetAuthorsQueryVariables>;