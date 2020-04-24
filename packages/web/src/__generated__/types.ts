/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface GetAuthorQueryVariables {
  id: number,
};

export interface GetAuthorQuery {
  author:  {
    __typename: "Author",
    name: string,
    books:  Array< {
      __typename: "Book",
      id: number,
      title: string,
      cover:  {
        __typename: "Image",
        url: string,
      },
    } | null > | null,
  } | null,
};

export interface GetAuthorsQuery {
  authors:  Array< {
    __typename: "Author",
    id: number,
    name: string,
    photo:  {
      __typename: "Image",
      url: string,
    },
  } >,
};

export interface GetBooksQuery {
  books:  Array< {
    __typename: "Book",
    id: number,
    title: string,
    cover:  {
      __typename: "Image",
      url: string,
    },
    author:  {
      __typename: "Author",
      name: string,
    } | null,
  } >,
};

export interface GetUsersQuery {
  users:  Array< {
    __typename: "User",
    id: number,
    name: string,
    avatar:  {
      __typename: "Avatar",
      image:  {
        __typename: "Image",
        url: string,
      },
      color: string,
    },
  } >,
};
