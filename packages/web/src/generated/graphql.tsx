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
