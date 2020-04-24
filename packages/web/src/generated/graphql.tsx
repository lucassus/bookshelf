import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client';
import * as ApolloReactHoc from '@apollo/client';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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
export type GetAuthorComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAuthorQuery, GetAuthorQueryVariables>, 'query'> & ({ variables: GetAuthorQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetAuthorComponent = (props: GetAuthorComponentProps) => (
      <ApolloReactComponents.Query<GetAuthorQuery, GetAuthorQueryVariables> query={GetAuthorDocument} {...props} />
    );
    
export type GetAuthorProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAuthorQuery, GetAuthorQueryVariables>
    } & TChildProps;
export function withGetAuthor<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAuthorQuery,
  GetAuthorQueryVariables,
  GetAuthorProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAuthorQuery, GetAuthorQueryVariables, GetAuthorProps<TChildProps, TDataName>>(GetAuthorDocument, {
      alias: 'getAuthor',
      ...operationOptions
    });
};
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
export type GetAuthorsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAuthorsQuery, GetAuthorsQueryVariables>, 'query'>;

    export const GetAuthorsComponent = (props: GetAuthorsComponentProps) => (
      <ApolloReactComponents.Query<GetAuthorsQuery, GetAuthorsQueryVariables> query={GetAuthorsDocument} {...props} />
    );
    
export type GetAuthorsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAuthorsQuery, GetAuthorsQueryVariables>
    } & TChildProps;
export function withGetAuthors<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAuthorsQuery,
  GetAuthorsQueryVariables,
  GetAuthorsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAuthorsQuery, GetAuthorsQueryVariables, GetAuthorsProps<TChildProps, TDataName>>(GetAuthorsDocument, {
      alias: 'getAuthors',
      ...operationOptions
    });
};
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
export type GetBooksComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetBooksQuery, GetBooksQueryVariables>, 'query'>;

    export const GetBooksComponent = (props: GetBooksComponentProps) => (
      <ApolloReactComponents.Query<GetBooksQuery, GetBooksQueryVariables> query={GetBooksDocument} {...props} />
    );
    
export type GetBooksProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetBooksQuery, GetBooksQueryVariables>
    } & TChildProps;
export function withGetBooks<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetBooksQuery,
  GetBooksQueryVariables,
  GetBooksProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetBooksQuery, GetBooksQueryVariables, GetBooksProps<TChildProps, TDataName>>(GetBooksDocument, {
      alias: 'getBooks',
      ...operationOptions
    });
};
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
export type GetUsersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUsersQuery, GetUsersQueryVariables>, 'query'>;

    export const GetUsersComponent = (props: GetUsersComponentProps) => (
      <ApolloReactComponents.Query<GetUsersQuery, GetUsersQueryVariables> query={GetUsersDocument} {...props} />
    );
    
export type GetUsersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUsersQuery, GetUsersQueryVariables>
    } & TChildProps;
export function withGetUsers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUsersQuery,
  GetUsersQueryVariables,
  GetUsersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUsersQuery, GetUsersQueryVariables, GetUsersProps<TChildProps, TDataName>>(GetUsersDocument, {
      alias: 'getUsers',
      ...operationOptions
    });
};
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<GetUsersQuery, GetUsersQueryVariables>;