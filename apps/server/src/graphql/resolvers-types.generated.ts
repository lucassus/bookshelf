import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
import {
  Author as AuthorEntity,
  Avatar as AvatarEntity,
  Book as BookEntity,
  BookCopy as BookCopyEntity,
  User as UserEntity
} from "../database/entity";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ExternalID: string;
  ISODateString: string;
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

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  RegistrationInput: RegistrationInput;
  String: ResolverTypeWrapper<Scalars["String"]>;
  RegistrationResult:
    | ResolversTypes["ProtectedUser"]
    | ResolversTypes["ValidationErrors"];
  UpdateProfileInput: UpdateProfileInput;
  UpdateProfileResult:
    | ResolversTypes["ProtectedUser"]
    | ResolversTypes["ValidationErrors"];
  GuestUser: ResolverTypeWrapper<GuestUser>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CurrentUserResult:
    | ResolversTypes["GuestUser"]
    | ResolversTypes["ProtectedUser"];
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Role: Role;
  LoginInput: LoginInput;
  LoginSuccess: ResolverTypeWrapper<
    Omit<LoginSuccess, "currentUser"> & {
      currentUser: ResolversTypes["ProtectedUser"];
    }
  >;
  LoginFailure: ResolverTypeWrapper<LoginFailure>;
  LoginResult: ResolversTypes["LoginSuccess"] | ResolversTypes["LoginFailure"];
  Author: ResolverTypeWrapper<AuthorEntity>;
  Book: ResolverTypeWrapper<BookEntity>;
  AuthorResponse:
    | ResolversTypes["Author"]
    | ResolversTypes["ResourceNotFoundError"];
  BookCopy: ResolverTypeWrapper<BookCopyEntity>;
  User: ResolversTypes["ProtectedUser"] | ResolversTypes["PublicUser"];
  ProtectedUser: ResolverTypeWrapper<UserEntity>;
  UpdateBookFavouriteResult:
    | ResolversTypes["Book"]
    | ResolversTypes["MutationError"];
  BorrowBookCopyResult:
    | ResolversTypes["BookCopy"]
    | ResolversTypes["MutationError"];
  ReturnBookCopyResult:
    | ResolversTypes["BookCopy"]
    | ResolversTypes["MutationError"];
  BookResult: ResolversTypes["Book"] | ResolversTypes["ResourceNotFoundError"];
  ExternalID: ResolverTypeWrapper<Scalars["ExternalID"]>;
  ISODateString: ResolverTypeWrapper<Scalars["ISODateString"]>;
  Timestampable:
    | ResolversTypes["Author"]
    | ResolversTypes["Book"]
    | ResolversTypes["BookCopy"]
    | ResolversTypes["ProtectedUser"]
    | ResolversTypes["PublicUser"];
  Image: ResolverTypeWrapper<Image>;
  Error:
    | ResolversTypes["MutationError"]
    | ResolversTypes["ValidationError"]
    | ResolversTypes["ResourceNotFoundError"]
    | ResolversTypes["FlaggedAvatarError"];
  MutationError: ResolverTypeWrapper<MutationError>;
  ValidationError: ResolverTypeWrapper<ValidationError>;
  ValidationErrors: ResolverTypeWrapper<ValidationErrors>;
  MutationResponse:
    | ResolversTypes["CreateUserResult"]
    | ResolversTypes["DeleteUserResult"];
  Resource:
    | ResolversTypes["Author"]
    | ResolversTypes["Book"]
    | ResolversTypes["ProtectedUser"]
    | ResolversTypes["PublicUser"];
  ResourceNotFoundError: ResolverTypeWrapper<ResourceNotFoundError>;
  Anything:
    | ResolversTypes["PublicUser"]
    | ResolversTypes["ProtectedUser"]
    | ResolversTypes["Author"]
    | ResolversTypes["Book"];
  PublicUser: ResolverTypeWrapper<UserEntity>;
  Avatar: ResolverTypeWrapper<AvatarEntity>;
  FlaggedAvatarError: ResolverTypeWrapper<FlaggedAvatarError>;
  AvatarResult: ResolversTypes["Avatar"] | ResolversTypes["FlaggedAvatarError"];
  AvatarInput: AvatarInput;
  CreateUserInput: CreateUserInput;
  UpdateUserInput: UpdateUserInput;
  CreateUserResult: ResolverTypeWrapper<
    Omit<CreateUserResult, "user"> & { user?: Maybe<ResolversTypes["User"]> }
  >;
  DeleteUserResult: ResolverTypeWrapper<DeleteUserResult>;
  UserResult:
    | ResolversTypes["PublicUser"]
    | ResolversTypes["ProtectedUser"]
    | ResolversTypes["ResourceNotFoundError"];
  UpdateUserResult:
    | ResolversTypes["ProtectedUser"]
    | ResolversTypes["ResourceNotFoundError"]
    | ResolversTypes["ValidationErrors"];
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  RegistrationInput: RegistrationInput;
  String: Scalars["String"];
  RegistrationResult:
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["ValidationErrors"];
  UpdateProfileInput: UpdateProfileInput;
  UpdateProfileResult:
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["ValidationErrors"];
  GuestUser: GuestUser;
  Boolean: Scalars["Boolean"];
  CurrentUserResult:
    | ResolversParentTypes["GuestUser"]
    | ResolversParentTypes["ProtectedUser"];
  Query: {};
  Int: Scalars["Int"];
  ID: Scalars["ID"];
  Mutation: {};
  LoginInput: LoginInput;
  LoginSuccess: Omit<LoginSuccess, "currentUser"> & {
    currentUser: ResolversParentTypes["ProtectedUser"];
  };
  LoginFailure: LoginFailure;
  LoginResult:
    | ResolversParentTypes["LoginSuccess"]
    | ResolversParentTypes["LoginFailure"];
  Author: AuthorEntity;
  Book: BookEntity;
  AuthorResponse:
    | ResolversParentTypes["Author"]
    | ResolversParentTypes["ResourceNotFoundError"];
  BookCopy: BookCopyEntity;
  User:
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["PublicUser"];
  ProtectedUser: UserEntity;
  UpdateBookFavouriteResult:
    | ResolversParentTypes["Book"]
    | ResolversParentTypes["MutationError"];
  BorrowBookCopyResult:
    | ResolversParentTypes["BookCopy"]
    | ResolversParentTypes["MutationError"];
  ReturnBookCopyResult:
    | ResolversParentTypes["BookCopy"]
    | ResolversParentTypes["MutationError"];
  BookResult:
    | ResolversParentTypes["Book"]
    | ResolversParentTypes["ResourceNotFoundError"];
  ExternalID: Scalars["ExternalID"];
  ISODateString: Scalars["ISODateString"];
  Timestampable:
    | ResolversParentTypes["Author"]
    | ResolversParentTypes["Book"]
    | ResolversParentTypes["BookCopy"]
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["PublicUser"];
  Image: Image;
  Error:
    | ResolversParentTypes["MutationError"]
    | ResolversParentTypes["ValidationError"]
    | ResolversParentTypes["ResourceNotFoundError"]
    | ResolversParentTypes["FlaggedAvatarError"];
  MutationError: MutationError;
  ValidationError: ValidationError;
  ValidationErrors: ValidationErrors;
  MutationResponse:
    | ResolversParentTypes["CreateUserResult"]
    | ResolversParentTypes["DeleteUserResult"];
  Resource:
    | ResolversParentTypes["Author"]
    | ResolversParentTypes["Book"]
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["PublicUser"];
  ResourceNotFoundError: ResourceNotFoundError;
  Anything:
    | ResolversParentTypes["PublicUser"]
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["Author"]
    | ResolversParentTypes["Book"];
  PublicUser: UserEntity;
  Avatar: AvatarEntity;
  FlaggedAvatarError: FlaggedAvatarError;
  AvatarResult:
    | ResolversParentTypes["Avatar"]
    | ResolversParentTypes["FlaggedAvatarError"];
  AvatarInput: AvatarInput;
  CreateUserInput: CreateUserInput;
  UpdateUserInput: UpdateUserInput;
  CreateUserResult: Omit<CreateUserResult, "user"> & {
    user?: Maybe<ResolversParentTypes["User"]>;
  };
  DeleteUserResult: DeleteUserResult;
  UserResult:
    | ResolversParentTypes["PublicUser"]
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["ResourceNotFoundError"];
  UpdateUserResult:
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["ResourceNotFoundError"]
    | ResolversParentTypes["ValidationErrors"];
};

export type RequireAuthorizationDirectiveArgs = { role?: Maybe<Role> };

export type RequireAuthorizationDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = RequireAuthorizationDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RegistrationResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RegistrationResult"] = ResolversParentTypes["RegistrationResult"]
> = {
  __resolveType?: TypeResolveFn<
    "ProtectedUser" | "ValidationErrors",
    ParentType,
    ContextType
  >;
};

export type UpdateProfileResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UpdateProfileResult"] = ResolversParentTypes["UpdateProfileResult"]
> = {
  __resolveType?: TypeResolveFn<
    "ProtectedUser" | "ValidationErrors",
    ParentType,
    ContextType
  >;
};

export type GuestUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["GuestUser"] = ResolversParentTypes["GuestUser"]
> = {
  _?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrentUserResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CurrentUserResult"] = ResolversParentTypes["CurrentUserResult"]
> = {
  __resolveType?: TypeResolveFn<
    "GuestUser" | "ProtectedUser",
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  currentUser?: Resolver<
    ResolversTypes["CurrentUserResult"],
    ParentType,
    ContextType
  >;
  authors?: Resolver<Array<ResolversTypes["Author"]>, ParentType, ContextType>;
  author?: Resolver<
    ResolversTypes["AuthorResponse"],
    ParentType,
    ContextType,
    RequireFields<QueryAuthorArgs, "id">
  >;
  booksCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  books?: Resolver<
    Array<ResolversTypes["Book"]>,
    ParentType,
    ContextType,
    RequireFields<QueryBooksArgs, "offset" | "limit">
  >;
  book?: Resolver<
    ResolversTypes["BookResult"],
    ParentType,
    ContextType,
    RequireFields<QueryBookArgs, "id">
  >;
  randomBook?: Resolver<Maybe<ResolversTypes["Book"]>, ParentType, ContextType>;
  resources?: Resolver<
    Array<ResolversTypes["Resource"]>,
    ParentType,
    ContextType
  >;
  resource?: Resolver<
    ResolversTypes["Resource"],
    ParentType,
    ContextType,
    RequireFields<QueryResourceArgs, "id">
  >;
  anything?: Resolver<
    ResolversTypes["Anything"],
    ParentType,
    ContextType,
    RequireFields<QueryAnythingArgs, "id">
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
  user?: Resolver<
    ResolversTypes["UserResult"],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  register?: Resolver<
    ResolversTypes["RegistrationResult"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, "input">
  >;
  updateProfile?: Resolver<
    ResolversTypes["UpdateProfileResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateProfileArgs, "input">
  >;
  login?: Resolver<
    ResolversTypes["LoginResult"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "input">
  >;
  logout?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  updateBookFavourite?: Resolver<
    ResolversTypes["UpdateBookFavouriteResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateBookFavouriteArgs, "id" | "favourite">
  >;
  borrowBookCopy?: Resolver<
    ResolversTypes["BorrowBookCopyResult"],
    ParentType,
    ContextType,
    RequireFields<MutationBorrowBookCopyArgs, "id">
  >;
  returnBookCopy?: Resolver<
    ResolversTypes["ReturnBookCopyResult"],
    ParentType,
    ContextType,
    RequireFields<MutationReturnBookCopyArgs, "id">
  >;
  createUser?: Resolver<
    ResolversTypes["CreateUserResult"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, "input">
  >;
  updateUser?: Resolver<
    ResolversTypes["UpdateUserResult"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "input">
  >;
  deleteUser?: Resolver<
    ResolversTypes["DeleteUserResult"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteUserArgs, "id">
  >;
};

export type LoginSuccessResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LoginSuccess"] = ResolversParentTypes["LoginSuccess"]
> = {
  currentUser?: Resolver<
    ResolversTypes["ProtectedUser"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginFailureResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LoginFailure"] = ResolversParentTypes["LoginFailure"]
> = {
  validationErrors?: Resolver<
    Array<ResolversTypes["ValidationError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LoginResult"] = ResolversParentTypes["LoginResult"]
> = {
  __resolveType?: TypeResolveFn<
    "LoginSuccess" | "LoginFailure",
    ParentType,
    ContextType
  >;
};

export type AuthorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Author"] = ResolversParentTypes["Author"]
> = {
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  photo?: Resolver<ResolversTypes["Image"], ParentType, ContextType>;
  createdAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  books?: Resolver<Array<ResolversTypes["Book"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Book"] = ResolversParentTypes["Book"]
> = {
  author?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  cover?: Resolver<ResolversTypes["Image"], ParentType, ContextType>;
  favourite?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  copies?: Resolver<Array<ResolversTypes["BookCopy"]>, ParentType, ContextType>;
  createdAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AuthorResponse"] = ResolversParentTypes["AuthorResponse"]
> = {
  __resolveType?: TypeResolveFn<
    "Author" | "ResourceNotFoundError",
    ParentType,
    ContextType
  >;
};

export type BookCopyResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BookCopy"] = ResolversParentTypes["BookCopy"]
> = {
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
  book?: Resolver<ResolversTypes["Book"], ParentType, ContextType>;
  borrowedAt?: Resolver<
    Maybe<ResolversTypes["ISODateString"]>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  owner?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  borrower?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  __resolveType?: TypeResolveFn<
    "ProtectedUser" | "PublicUser",
    ParentType,
    ContextType
  >;
  ownedBookCopies?: Resolver<
    Array<ResolversTypes["BookCopy"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  info?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes["AvatarResult"], ParentType, ContextType>;
  createdAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
};

export type ProtectedUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ProtectedUser"] = ResolversParentTypes["ProtectedUser"]
> = {
  borrowedBookCopies?: Resolver<
    Array<ResolversTypes["BookCopy"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  info?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes["AvatarResult"], ParentType, ContextType>;
  createdAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  ownedBookCopies?: Resolver<
    Array<ResolversTypes["BookCopy"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateBookFavouriteResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UpdateBookFavouriteResult"] = ResolversParentTypes["UpdateBookFavouriteResult"]
> = {
  __resolveType?: TypeResolveFn<
    "Book" | "MutationError",
    ParentType,
    ContextType
  >;
};

export type BorrowBookCopyResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BorrowBookCopyResult"] = ResolversParentTypes["BorrowBookCopyResult"]
> = {
  __resolveType?: TypeResolveFn<
    "BookCopy" | "MutationError",
    ParentType,
    ContextType
  >;
};

export type ReturnBookCopyResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ReturnBookCopyResult"] = ResolversParentTypes["ReturnBookCopyResult"]
> = {
  __resolveType?: TypeResolveFn<
    "BookCopy" | "MutationError",
    ParentType,
    ContextType
  >;
};

export type BookResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BookResult"] = ResolversParentTypes["BookResult"]
> = {
  __resolveType?: TypeResolveFn<
    "Book" | "ResourceNotFoundError",
    ParentType,
    ContextType
  >;
};

export interface ExternalIdScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ExternalID"], any> {
  name: "ExternalID";
}

export interface IsoDateStringScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["ISODateString"], any> {
  name: "ISODateString";
}

export type TimestampableResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Timestampable"] = ResolversParentTypes["Timestampable"]
> = {
  __resolveType?: TypeResolveFn<
    "Author" | "Book" | "BookCopy" | "ProtectedUser" | "PublicUser",
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
};

export type ImageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Image"] = ResolversParentTypes["Image"]
> = {
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Error"] = ResolversParentTypes["Error"]
> = {
  __resolveType?: TypeResolveFn<
    | "MutationError"
    | "ValidationError"
    | "ResourceNotFoundError"
    | "FlaggedAvatarError",
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type MutationErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationError"] = ResolversParentTypes["MutationError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ValidationError"] = ResolversParentTypes["ValidationError"]
> = {
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ValidationErrors"] = ResolversParentTypes["ValidationErrors"]
> = {
  errors?: Resolver<
    Array<ResolversTypes["ValidationError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MutationResponse"] = ResolversParentTypes["MutationResponse"]
> = {
  __resolveType?: TypeResolveFn<
    "CreateUserResult" | "DeleteUserResult",
    ParentType,
    ContextType
  >;
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type ResourceResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Resource"] = ResolversParentTypes["Resource"]
> = {
  __resolveType?: TypeResolveFn<
    "Author" | "Book" | "ProtectedUser" | "PublicUser",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
};

export type ResourceNotFoundErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ResourceNotFoundError"] = ResolversParentTypes["ResourceNotFoundError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnythingResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Anything"] = ResolversParentTypes["Anything"]
> = {
  __resolveType?: TypeResolveFn<
    "PublicUser" | "ProtectedUser" | "Author" | "Book",
    ParentType,
    ContextType
  >;
};

export type PublicUserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PublicUser"] = ResolversParentTypes["PublicUser"]
> = {
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  info?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes["AvatarResult"], ParentType, ContextType>;
  createdAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<
    ResolversTypes["ISODateString"],
    ParentType,
    ContextType
  >;
  ownedBookCopies?: Resolver<
    Array<ResolversTypes["BookCopy"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvatarResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Avatar"] = ResolversParentTypes["Avatar"]
> = {
  image?: Resolver<ResolversTypes["Image"], ParentType, ContextType>;
  color?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlaggedAvatarErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["FlaggedAvatarError"] = ResolversParentTypes["FlaggedAvatarError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvatarResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AvatarResult"] = ResolversParentTypes["AvatarResult"]
> = {
  __resolveType?: TypeResolveFn<
    "Avatar" | "FlaggedAvatarError",
    ParentType,
    ContextType
  >;
};

export type CreateUserResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CreateUserResult"] = ResolversParentTypes["CreateUserResult"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DeleteUserResult"] = ResolversParentTypes["DeleteUserResult"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserResult"] = ResolversParentTypes["UserResult"]
> = {
  __resolveType?: TypeResolveFn<
    "PublicUser" | "ProtectedUser" | "ResourceNotFoundError",
    ParentType,
    ContextType
  >;
};

export type UpdateUserResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UpdateUserResult"] = ResolversParentTypes["UpdateUserResult"]
> = {
  __resolveType?: TypeResolveFn<
    "ProtectedUser" | "ResourceNotFoundError" | "ValidationErrors",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  RegistrationResult?: RegistrationResultResolvers<ContextType>;
  UpdateProfileResult?: UpdateProfileResultResolvers<ContextType>;
  GuestUser?: GuestUserResolvers<ContextType>;
  CurrentUserResult?: CurrentUserResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  LoginSuccess?: LoginSuccessResolvers<ContextType>;
  LoginFailure?: LoginFailureResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  Author?: AuthorResolvers<ContextType>;
  Book?: BookResolvers<ContextType>;
  AuthorResponse?: AuthorResponseResolvers<ContextType>;
  BookCopy?: BookCopyResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  ProtectedUser?: ProtectedUserResolvers<ContextType>;
  UpdateBookFavouriteResult?: UpdateBookFavouriteResultResolvers<ContextType>;
  BorrowBookCopyResult?: BorrowBookCopyResultResolvers<ContextType>;
  ReturnBookCopyResult?: ReturnBookCopyResultResolvers<ContextType>;
  BookResult?: BookResultResolvers<ContextType>;
  ExternalID?: GraphQLScalarType;
  ISODateString?: GraphQLScalarType;
  Timestampable?: TimestampableResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  MutationError?: MutationErrorResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
  ValidationErrors?: ValidationErrorsResolvers<ContextType>;
  MutationResponse?: MutationResponseResolvers<ContextType>;
  Resource?: ResourceResolvers<ContextType>;
  ResourceNotFoundError?: ResourceNotFoundErrorResolvers<ContextType>;
  Anything?: AnythingResolvers<ContextType>;
  PublicUser?: PublicUserResolvers<ContextType>;
  Avatar?: AvatarResolvers<ContextType>;
  FlaggedAvatarError?: FlaggedAvatarErrorResolvers<ContextType>;
  AvatarResult?: AvatarResultResolvers<ContextType>;
  CreateUserResult?: CreateUserResultResolvers<ContextType>;
  DeleteUserResult?: DeleteUserResultResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  UpdateUserResult?: UpdateUserResultResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  requireAuthorization?: RequireAuthorizationDirectiveResolver<
    any,
    any,
    ContextType
  >;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;
