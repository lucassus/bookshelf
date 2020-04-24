import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
   __typename?: 'Query';
  authors: Array<Author>;
  author?: Maybe<Author>;
  randomAuthor: Author;
  books: Array<Book>;
  randomBook: Book;
  users: Array<User>;
};


export type QueryAuthorArgs = {
  id: Scalars['Int'];
};

export type Author = {
   __typename?: 'Author';
  id: Scalars['Int'];
  name: Scalars['String'];
  photo: Image;
  books?: Maybe<Array<Maybe<Book>>>;
};

export type Book = {
   __typename?: 'Book';
  id: Scalars['Int'];
  title: Scalars['String'];
  cover: Image;
  author?: Maybe<Author>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  avatar: Avatar;
};

export type Image = {
   __typename?: 'Image';
  url: Scalars['String'];
};

export type Avatar = {
   __typename?: 'Avatar';
  image: Image;
  color: Scalars['String'];
};

export type GetAuthorQueryVariables = {
  id: Scalars['Int'];
};


export type GetAuthorQuery = (
  { __typename?: 'Query' }
  & { author?: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, 'name'>
    & { books?: Maybe<Array<Maybe<(
      { __typename?: 'Book' }
      & Pick<Book, 'id' | 'title'>
      & { cover: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    )>>> }
  )> }
);

export type GetAuthorsQueryVariables = {};


export type GetAuthorsQuery = (
  { __typename?: 'Query' }
  & { authors: Array<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name'>
    & { photo: (
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    ) }
  )> }
);

export type GetBooksQueryVariables = {};


export type GetBooksQuery = (
  { __typename?: 'Query' }
  & { books: Array<(
    { __typename?: 'Book' }
    & Pick<Book, 'id' | 'title'>
    & { cover: (
      { __typename?: 'Image' }
      & Pick<Image, 'url'>
    ), author?: Maybe<(
      { __typename?: 'Author' }
      & Pick<Author, 'name'>
    )> }
  )> }
);

export type GetUsersQueryVariables = {};


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { avatar: (
      { __typename?: 'Avatar' }
      & Pick<Avatar, 'color'>
      & { image: (
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      ) }
    ) }
  )> }
);


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
export function useGetAuthorQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAuthorQuery, GetAuthorQueryVariables>) {
        return ApolloReactHooks.useQuery<GetAuthorQuery, GetAuthorQueryVariables>(GetAuthorDocument, baseOptions);
      }
export function useGetAuthorLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAuthorQuery, GetAuthorQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetAuthorQuery, GetAuthorQueryVariables>(GetAuthorDocument, baseOptions);
        }
export type GetAuthorQueryHookResult = ReturnType<typeof useGetAuthorQuery>;
export type GetAuthorLazyQueryHookResult = ReturnType<typeof useGetAuthorLazyQuery>;
export type GetAuthorQueryResult = ApolloReactCommon.QueryResult<GetAuthorQuery, GetAuthorQueryVariables>;
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
export const GetBooksDocument = gql`
    query GetBooks {
  books {
    id
    title
    cover {
      url
    }
    author {
      name
    }
  }
}
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
 *   },
 * });
 */
export function useGetBooksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
        return ApolloReactHooks.useQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, baseOptions);
      }
export function useGetBooksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBooksQuery, GetBooksQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetBooksQuery, GetBooksQueryVariables>(GetBooksDocument, baseOptions);
        }
export type GetBooksQueryHookResult = ReturnType<typeof useGetBooksQuery>;
export type GetBooksLazyQueryHookResult = ReturnType<typeof useGetBooksLazyQuery>;
export type GetBooksQueryResult = ApolloReactCommon.QueryResult<GetBooksQuery, GetBooksQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    id
    name
    avatar {
      image {
        url
      }
      color
    }
  }
}
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
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, baseOptions);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;