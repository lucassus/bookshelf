/* tslint:disable */
//  This file was automatically generated and should not be edited.

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
