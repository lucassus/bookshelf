export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ExternalID: any;
  ISODateString: any;
};

export type RegistrationInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
};

export type RegistrationResult = ProtectedUser | ValidationErrors;

export type UpdateProfileInput = {
  name: Scalars["String"];
  email: Scalars["String"];
  info: Scalars["String"];
};

export type UpdateProfileResult = ProtectedUser | ValidationErrors;

export type GuestUser = {
  __typename?: "GuestUser";
  _?: Maybe<Scalars["Boolean"]>;
};

export type CurrentUserResult = GuestUser | ProtectedUser;

export type Query = {
  __typename?: "Query";
  /** Returns the currently logged in user. */
  currentUser: CurrentUserResult;
  authors: Array<Author>;
  author: AuthorResponse;
  booksCount: Scalars["Int"];
  books: Array<Book>;
  book: BookResult;
  randomBook?: Maybe<Book>;
  resources: Array<Resource>;
  resource: Resource;
  /** @deprecated No longer supported. Use 'resource' instead */
  anything: Anything;
  users: Array<User>;
  user: UserResult;
};

export type QueryAuthorArgs = {
  id: Scalars["ExternalID"];
};

export type QueryBooksArgs = {
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type QueryBookArgs = {
  id: Scalars["ExternalID"];
};

export type QueryResourceArgs = {
  id: Scalars["ID"];
};

export type QueryAnythingArgs = {
  id: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ExternalID"];
};

export type Mutation = {
  __typename?: "Mutation";
  register: RegistrationResult;
  updateProfile: UpdateProfileResult;
  /** Authenticates a user with the given credentials. */
  login: LoginResult;
  logout: Scalars["Boolean"];
  updateBookFavourite: UpdateBookFavouriteResult;
  borrowBookCopy: BorrowBookCopyResult;
  returnBookCopy: ReturnBookCopyResult;
  createUser: CreateUserResult;
  updateUser: UpdateUserResult;
  deleteUser: DeleteUserResult;
};

export type MutationRegisterArgs = {
  input: RegistrationInput;
};

export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationUpdateBookFavouriteArgs = {
  id: Scalars["ExternalID"];
  favourite: Scalars["Boolean"];
};

export type MutationBorrowBookCopyArgs = {
  id: Scalars["ExternalID"];
};

export type MutationReturnBookCopyArgs = {
  id: Scalars["ExternalID"];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ExternalID"];
};

export enum Role {
  Admin = "Admin",
  User = "User"
}

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginSuccess = {
  __typename?: "LoginSuccess";
  currentUser: ProtectedUser;
};

export type LoginFailure = {
  __typename?: "LoginFailure";
  validationErrors: Array<ValidationError>;
};

export type LoginResult = LoginSuccess | LoginFailure;

export type Author = Resource &
  Timestampable & {
    __typename?: "Author";
    id: Scalars["ExternalID"];
    name: Scalars["String"];
    bio: Scalars["String"];
    photo: Image;
    createdAt: Scalars["ISODateString"];
    updatedAt: Scalars["ISODateString"];
    books: Array<Book>;
  };

export type Book = Resource &
  Timestampable & {
    __typename?: "Book";
    author: Author;
    id: Scalars["ExternalID"];
    title: Scalars["String"];
    description: Scalars["String"];
    cover: Image;
    favourite: Scalars["Boolean"];
    copies: Array<BookCopy>;
    createdAt: Scalars["ISODateString"];
    updatedAt: Scalars["ISODateString"];
  };

export type AuthorResponse = Author | ResourceNotFoundError;

export type BookCopy = Timestampable & {
  __typename?: "BookCopy";
  id: Scalars["ExternalID"];
  book: Book;
  borrowedAt?: Maybe<Scalars["ISODateString"]>;
  createdAt: Scalars["ISODateString"];
  updatedAt: Scalars["ISODateString"];
  owner: User;
  borrower?: Maybe<User>;
};

export type User = {
  ownedBookCopies: Array<BookCopy>;
  id: Scalars["ExternalID"];
  name: Scalars["String"];
  info: Scalars["String"];
  avatar: AvatarResult;
  createdAt: Scalars["ISODateString"];
  updatedAt: Scalars["ISODateString"];
};

export type ProtectedUser = User &
  Resource &
  Timestampable & {
    __typename?: "ProtectedUser";
    borrowedBookCopies: Array<BookCopy>;
    id: Scalars["ExternalID"];
    name: Scalars["String"];
    info: Scalars["String"];
    avatar: AvatarResult;
    createdAt: Scalars["ISODateString"];
    updatedAt: Scalars["ISODateString"];
    email: Scalars["String"];
    isAdmin: Scalars["Boolean"];
    ownedBookCopies: Array<BookCopy>;
  };

export type UpdateBookFavouriteResult = Book | MutationError;

export type BorrowBookCopyResult = BookCopy | MutationError;

export type ReturnBookCopyResult = BookCopy | MutationError;

export type BookResult = Book | ResourceNotFoundError;

export type Timestampable = {
  createdAt: Scalars["ISODateString"];
  updatedAt: Scalars["ISODateString"];
};

export type Image = {
  __typename?: "Image";
  path: Scalars["String"];
  url: Scalars["String"];
};

export type Error = {
  message: Scalars["String"];
};

export type MutationError = Error & {
  __typename?: "MutationError";
  message: Scalars["String"];
};

export type ValidationError = Error & {
  __typename?: "ValidationError";
  path: Scalars["String"];
  message: Scalars["String"];
};

export type ValidationErrors = {
  __typename?: "ValidationErrors";
  errors: Array<ValidationError>;
};

export type MutationResponse = {
  /** A boolean that indicates whether the mutation was successful. */
  success: Scalars["Boolean"];
  /** Human-readable string that describes the result of the mutation */
  message: Scalars["String"];
};

export type Resource = {
  id: Scalars["ExternalID"];
};

export type ResourceNotFoundError = Error & {
  __typename?: "ResourceNotFoundError";
  message: Scalars["String"];
};

export type Anything = PublicUser | ProtectedUser | Author | Book;

export type PublicUser = User &
  Resource &
  Timestampable & {
    __typename?: "PublicUser";
    id: Scalars["ExternalID"];
    name: Scalars["String"];
    info: Scalars["String"];
    avatar: AvatarResult;
    createdAt: Scalars["ISODateString"];
    updatedAt: Scalars["ISODateString"];
    ownedBookCopies: Array<BookCopy>;
  };

export type Avatar = {
  __typename?: "Avatar";
  image: Image;
  color: Scalars["String"];
};

export type FlaggedAvatarError = Error & {
  __typename?: "FlaggedAvatarError";
  message: Scalars["String"];
};

export type AvatarResult = Avatar | FlaggedAvatarError;

export type AvatarInput = {
  imagePath: Scalars["String"];
  color: Scalars["String"];
};

export type CreateUserInput = {
  name: Scalars["String"];
  info: Scalars["String"];
  email: Scalars["String"];
  password: Scalars["String"];
  avatar: AvatarInput;
};

export type UpdateUserInput = {
  id: Scalars["ExternalID"];
  name: Scalars["String"];
  email: Scalars["String"];
  info: Scalars["String"];
};

export type CreateUserResult = MutationResponse & {
  __typename?: "CreateUserResult";
  success: Scalars["Boolean"];
  message: Scalars["String"];
  user?: Maybe<User>;
};

export type DeleteUserResult = MutationResponse & {
  __typename?: "DeleteUserResult";
  success: Scalars["Boolean"];
  message: Scalars["String"];
};

export type UserResult = PublicUser | ProtectedUser | ResourceNotFoundError;

export type UpdateUserResult =
  | ProtectedUser
  | ResourceNotFoundError
  | ValidationErrors;
