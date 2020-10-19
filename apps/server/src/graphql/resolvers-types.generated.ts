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
import { Context, AuthenticatedContext } from "./context";
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
  readonly name: Scalars["String"];
  readonly email: Scalars["String"];
  readonly password: Scalars["String"];
};

export type RegistrationResult = ProtectedUser | ValidationErrors;

export type UpdateProfileInput = {
  readonly name: Scalars["String"];
  readonly email: Scalars["String"];
  readonly info: Scalars["String"];
};

export type UpdateProfileResult = ProtectedUser | ValidationErrors;

export type Query = {
  readonly __typename?: "Query";
  /** Returns the currently logged in user. */
  readonly currentUser?: Maybe<ProtectedUser>;
  readonly authors: ReadonlyArray<Author>;
  readonly author: AuthorResponse;
  readonly booksCount: Scalars["Int"];
  readonly books: ReadonlyArray<Book>;
  readonly book: BookResult;
  readonly randomBook?: Maybe<Book>;
  readonly resources: ReadonlyArray<Resource>;
  readonly resource: Resource;
  /** @deprecated No longer supported. Use 'resource' instead */
  readonly anything: Anything;
  readonly users: ReadonlyArray<User>;
  readonly user: UserResult;
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
  readonly __typename?: "Mutation";
  readonly register: RegistrationResult;
  readonly updateProfile: UpdateProfileResult;
  /** Authenticates a user with the given credentials. */
  readonly login: LoginResult;
  readonly logout: Scalars["Boolean"];
  readonly addBookToFavourites: BookResult;
  readonly removeBookFromFavourites: BookResult;
  readonly borrowBookCopy: BorrowBookCopyResult;
  readonly returnBookCopy: ReturnBookCopyResult;
  readonly createUser: CreateUserResult;
  readonly updateUser: UpdateUserResult;
  readonly deleteUser: DeleteUserResult;
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

export type MutationAddBookToFavouritesArgs = {
  id: Scalars["ExternalID"];
};

export type MutationRemoveBookFromFavouritesArgs = {
  id: Scalars["ExternalID"];
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
  readonly email: Scalars["String"];
  readonly password: Scalars["String"];
};

export type LoginSuccess = {
  readonly __typename?: "LoginSuccess";
  readonly currentUser: ProtectedUser;
};

export type LoginFailure = {
  readonly __typename?: "LoginFailure";
  readonly validationErrors: ReadonlyArray<ValidationError>;
};

export type LoginResult = LoginSuccess | LoginFailure;

export type Author = Resource &
  Timestampable & {
    readonly __typename?: "Author";
    readonly id: Scalars["ExternalID"];
    readonly name: Scalars["String"];
    readonly bio: Scalars["String"];
    readonly photo: Image;
    readonly createdAt: Scalars["ISODateString"];
    readonly updatedAt: Scalars["ISODateString"];
    readonly books: ReadonlyArray<Book>;
  };

export type Book = Resource &
  Timestampable & {
    readonly __typename?: "Book";
    readonly author: Author;
    readonly id: Scalars["ExternalID"];
    readonly title: Scalars["String"];
    readonly description: Scalars["String"];
    readonly cover: Image;
    readonly copies: ReadonlyArray<BookCopy>;
    readonly isFavourite?: Maybe<Scalars["Boolean"]>;
    readonly createdAt: Scalars["ISODateString"];
    readonly updatedAt: Scalars["ISODateString"];
  };

export type AuthorResponse = Author | ResourceNotFoundError;

export type BookCopy = Timestampable & {
  readonly __typename?: "BookCopy";
  readonly id: Scalars["ExternalID"];
  readonly book: Book;
  readonly borrowedAt?: Maybe<Scalars["ISODateString"]>;
  readonly createdAt: Scalars["ISODateString"];
  readonly updatedAt: Scalars["ISODateString"];
  readonly owner: User;
  readonly borrower?: Maybe<User>;
};

export type User = {
  readonly ownedBookCopies: ReadonlyArray<BookCopy>;
  readonly id: Scalars["ExternalID"];
  readonly name: Scalars["String"];
  readonly info: Scalars["String"];
  readonly avatar: AvatarResult;
  readonly createdAt: Scalars["ISODateString"];
  readonly updatedAt: Scalars["ISODateString"];
};

export type PublicUser = User &
  Resource &
  Timestampable & {
    readonly __typename?: "PublicUser";
    readonly ownedBookCopies: ReadonlyArray<BookCopy>;
    readonly id: Scalars["ExternalID"];
    readonly name: Scalars["String"];
    readonly info: Scalars["String"];
    readonly avatar: AvatarResult;
    readonly createdAt: Scalars["ISODateString"];
    readonly updatedAt: Scalars["ISODateString"];
  };

export type ProtectedUser = User &
  Resource &
  Timestampable & {
    readonly __typename?: "ProtectedUser";
    readonly ownedBookCopies: ReadonlyArray<BookCopy>;
    readonly borrowedBookCopies: ReadonlyArray<BookCopy>;
    readonly favouriteBooks: ReadonlyArray<Book>;
    readonly id: Scalars["ExternalID"];
    readonly name: Scalars["String"];
    readonly info: Scalars["String"];
    readonly avatar: AvatarResult;
    readonly createdAt: Scalars["ISODateString"];
    readonly updatedAt: Scalars["ISODateString"];
    readonly email: Scalars["String"];
    readonly isAdmin: Scalars["Boolean"];
  };

export type UpdateBookFavouriteResult = Book | MutationError;

export type BorrowBookCopyResult = BookCopy | MutationError;

export type ReturnBookCopyResult = BookCopy | MutationError;

export type BookResult = Book | ResourceNotFoundError;

export type Subscription = {
  readonly __typename?: "Subscription";
  readonly bookCopyBorrowed: BookCopy;
  readonly bookCopyReturned: BookCopy;
};

export type Timestampable = {
  readonly createdAt: Scalars["ISODateString"];
  readonly updatedAt: Scalars["ISODateString"];
};

export type Image = {
  readonly __typename?: "Image";
  readonly path: Scalars["String"];
  readonly url: Scalars["String"];
};

export type Error = {
  readonly message: Scalars["String"];
};

export type MutationError = Error & {
  readonly __typename?: "MutationError";
  readonly message: Scalars["String"];
};

export type ValidationError = Error & {
  readonly __typename?: "ValidationError";
  readonly path: Scalars["String"];
  readonly message: Scalars["String"];
};

export type ValidationErrors = {
  readonly __typename?: "ValidationErrors";
  readonly errors: ReadonlyArray<ValidationError>;
};

export type MutationResponse = {
  /** A boolean that indicates whether the mutation was successful. */
  readonly success: Scalars["Boolean"];
  /** Human-readable string that describes the result of the mutation */
  readonly message: Scalars["String"];
};

export type Resource = {
  readonly id: Scalars["ExternalID"];
};

export type ResourceNotFoundError = Error & {
  readonly __typename?: "ResourceNotFoundError";
  readonly message: Scalars["String"];
};

export type Anything = PublicUser | ProtectedUser | Author | Book;

export type Avatar = {
  readonly __typename?: "Avatar";
  readonly image: Image;
  readonly color: Scalars["String"];
};

export type FlaggedAvatarError = Error & {
  readonly __typename?: "FlaggedAvatarError";
  readonly message: Scalars["String"];
};

export type AvatarResult = Avatar | FlaggedAvatarError;

export type AvatarInput = {
  readonly imagePath: Scalars["String"];
  readonly color: Scalars["String"];
};

export type CreateUserInput = {
  readonly name: Scalars["String"];
  readonly info: Scalars["String"];
  readonly email: Scalars["String"];
  readonly password: Scalars["String"];
  readonly avatar: AvatarInput;
};

export type UpdateUserInput = {
  readonly id: Scalars["ExternalID"];
  readonly name: Scalars["String"];
  readonly email: Scalars["String"];
  readonly info: Scalars["String"];
};

export type CreateUserResult = MutationResponse & {
  readonly __typename?: "CreateUserResult";
  readonly success: Scalars["Boolean"];
  readonly message: Scalars["String"];
  readonly user?: Maybe<User>;
};

export type DeleteUserResult = MutationResponse & {
  readonly __typename?: "DeleteUserResult";
  readonly success: Scalars["Boolean"];
  readonly message: Scalars["String"];
};

export type UserResult = PublicUser | ProtectedUser | ResourceNotFoundError;

export type UpdateUserResult =
  | ProtectedUser
  | ResourceNotFoundError
  | ValidationErrors;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

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
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
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
  User: ResolversTypes["PublicUser"] | ResolversTypes["ProtectedUser"];
  PublicUser: ResolverTypeWrapper<UserEntity>;
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
  Subscription: ResolverTypeWrapper<{}>;
  ExternalID: ResolverTypeWrapper<Scalars["ExternalID"]>;
  ISODateString: ResolverTypeWrapper<Scalars["ISODateString"]>;
  Timestampable:
    | ResolversTypes["Author"]
    | ResolversTypes["Book"]
    | ResolversTypes["BookCopy"]
    | ResolversTypes["PublicUser"]
    | ResolversTypes["ProtectedUser"];
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
    | ResolversTypes["PublicUser"]
    | ResolversTypes["ProtectedUser"];
  ResourceNotFoundError: ResolverTypeWrapper<ResourceNotFoundError>;
  Anything:
    | ResolversTypes["PublicUser"]
    | ResolversTypes["ProtectedUser"]
    | ResolversTypes["Author"]
    | ResolversTypes["Book"];
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
  Query: {};
  Int: Scalars["Int"];
  ID: Scalars["ID"];
  Mutation: {};
  Boolean: Scalars["Boolean"];
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
    | ResolversParentTypes["PublicUser"]
    | ResolversParentTypes["ProtectedUser"];
  PublicUser: UserEntity;
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
  Subscription: {};
  ExternalID: Scalars["ExternalID"];
  ISODateString: Scalars["ISODateString"];
  Timestampable:
    | ResolversParentTypes["Author"]
    | ResolversParentTypes["Book"]
    | ResolversParentTypes["BookCopy"]
    | ResolversParentTypes["PublicUser"]
    | ResolversParentTypes["ProtectedUser"];
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
    | ResolversParentTypes["PublicUser"]
    | ResolversParentTypes["ProtectedUser"];
  ResourceNotFoundError: ResourceNotFoundError;
  Anything:
    | ResolversParentTypes["PublicUser"]
    | ResolversParentTypes["ProtectedUser"]
    | ResolversParentTypes["Author"]
    | ResolversParentTypes["Book"];
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
  ContextType = Context,
  Args = RequireAuthorizationDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RegistrationResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["RegistrationResult"] = ResolversParentTypes["RegistrationResult"]
> = {
  __resolveType?: TypeResolveFn<
    "ProtectedUser" | "ValidationErrors",
    ParentType,
    ContextType
  >;
};

export type UpdateProfileResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["UpdateProfileResult"] = ResolversParentTypes["UpdateProfileResult"]
> = {
  __resolveType?: TypeResolveFn<
    "ProtectedUser" | "ValidationErrors",
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  currentUser?: Resolver<
    Maybe<ResolversTypes["ProtectedUser"]>,
    ParentType,
    ContextType
  >;
  authors?: Resolver<
    ReadonlyArray<ResolversTypes["Author"]>,
    ParentType,
    ContextType
  >;
  author?: Resolver<
    ResolversTypes["AuthorResponse"],
    ParentType,
    ContextType,
    RequireFields<QueryAuthorArgs, "id">
  >;
  booksCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  books?: Resolver<
    ReadonlyArray<ResolversTypes["Book"]>,
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
    ReadonlyArray<ResolversTypes["Resource"]>,
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
  users?: Resolver<
    ReadonlyArray<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<
    ResolversTypes["UserResult"],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >;
};

export type MutationResolvers<
  ContextType = Context,
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
    AuthenticatedContext,
    RequireFields<MutationUpdateProfileArgs, "input">
  >;
  login?: Resolver<
    ResolversTypes["LoginResult"],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "input">
  >;
  logout?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  addBookToFavourites?: Resolver<
    ResolversTypes["BookResult"],
    ParentType,
    AuthenticatedContext,
    RequireFields<MutationAddBookToFavouritesArgs, "id">
  >;
  removeBookFromFavourites?: Resolver<
    ResolversTypes["BookResult"],
    ParentType,
    AuthenticatedContext,
    RequireFields<MutationRemoveBookFromFavouritesArgs, "id">
  >;
  borrowBookCopy?: Resolver<
    ResolversTypes["BorrowBookCopyResult"],
    ParentType,
    AuthenticatedContext,
    RequireFields<MutationBorrowBookCopyArgs, "id">
  >;
  returnBookCopy?: Resolver<
    ResolversTypes["ReturnBookCopyResult"],
    ParentType,
    AuthenticatedContext,
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
  ContextType = Context,
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
  ContextType = Context,
  ParentType extends ResolversParentTypes["LoginFailure"] = ResolversParentTypes["LoginFailure"]
> = {
  validationErrors?: Resolver<
    ReadonlyArray<ResolversTypes["ValidationError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["LoginResult"] = ResolversParentTypes["LoginResult"]
> = {
  __resolveType?: TypeResolveFn<
    "LoginSuccess" | "LoginFailure",
    ParentType,
    ContextType
  >;
};

export type AuthorResolvers<
  ContextType = Context,
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
  books?: Resolver<
    ReadonlyArray<ResolversTypes["Book"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BookResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Book"] = ResolversParentTypes["Book"]
> = {
  author?: Resolver<ResolversTypes["Author"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  cover?: Resolver<ResolversTypes["Image"], ParentType, ContextType>;
  copies?: Resolver<
    ReadonlyArray<ResolversTypes["BookCopy"]>,
    ParentType,
    ContextType
  >;
  isFavourite?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthorResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["AuthorResponse"] = ResolversParentTypes["AuthorResponse"]
> = {
  __resolveType?: TypeResolveFn<
    "Author" | "ResourceNotFoundError",
    ParentType,
    ContextType
  >;
};

export type BookCopyResolvers<
  ContextType = Context,
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
  ContextType = Context,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  __resolveType?: TypeResolveFn<
    "PublicUser" | "ProtectedUser",
    ParentType,
    ContextType
  >;
  ownedBookCopies?: Resolver<
    ReadonlyArray<ResolversTypes["BookCopy"]>,
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

export type PublicUserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["PublicUser"] = ResolversParentTypes["PublicUser"]
> = {
  ownedBookCopies?: Resolver<
    ReadonlyArray<ResolversTypes["BookCopy"]>,
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProtectedUserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["ProtectedUser"] = ResolversParentTypes["ProtectedUser"]
> = {
  ownedBookCopies?: Resolver<
    ReadonlyArray<ResolversTypes["BookCopy"]>,
    ParentType,
    ContextType
  >;
  borrowedBookCopies?: Resolver<
    ReadonlyArray<ResolversTypes["BookCopy"]>,
    ParentType,
    ContextType
  >;
  favouriteBooks?: Resolver<
    ReadonlyArray<ResolversTypes["Book"]>,
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
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateBookFavouriteResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["UpdateBookFavouriteResult"] = ResolversParentTypes["UpdateBookFavouriteResult"]
> = {
  __resolveType?: TypeResolveFn<
    "Book" | "MutationError",
    ParentType,
    ContextType
  >;
};

export type BorrowBookCopyResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["BorrowBookCopyResult"] = ResolversParentTypes["BorrowBookCopyResult"]
> = {
  __resolveType?: TypeResolveFn<
    "BookCopy" | "MutationError",
    ParentType,
    ContextType
  >;
};

export type ReturnBookCopyResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["ReturnBookCopyResult"] = ResolversParentTypes["ReturnBookCopyResult"]
> = {
  __resolveType?: TypeResolveFn<
    "BookCopy" | "MutationError",
    ParentType,
    ContextType
  >;
};

export type BookResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["BookResult"] = ResolversParentTypes["BookResult"]
> = {
  __resolveType?: TypeResolveFn<
    "Book" | "ResourceNotFoundError",
    ParentType,
    ContextType
  >;
};

export type SubscriptionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = {
  bookCopyBorrowed?: SubscriptionResolver<
    ResolversTypes["BookCopy"],
    "bookCopyBorrowed",
    ParentType,
    ContextType
  >;
  bookCopyReturned?: SubscriptionResolver<
    ResolversTypes["BookCopy"],
    "bookCopyReturned",
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
  ContextType = Context,
  ParentType extends ResolversParentTypes["Timestampable"] = ResolversParentTypes["Timestampable"]
> = {
  __resolveType?: TypeResolveFn<
    "Author" | "Book" | "BookCopy" | "PublicUser" | "ProtectedUser",
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
  ContextType = Context,
  ParentType extends ResolversParentTypes["Image"] = ResolversParentTypes["Image"]
> = {
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<
  ContextType = Context,
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
  ContextType = Context,
  ParentType extends ResolversParentTypes["MutationError"] = ResolversParentTypes["MutationError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["ValidationError"] = ResolversParentTypes["ValidationError"]
> = {
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidationErrorsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["ValidationErrors"] = ResolversParentTypes["ValidationErrors"]
> = {
  errors?: Resolver<
    ReadonlyArray<ResolversTypes["ValidationError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResponseResolvers<
  ContextType = Context,
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
  ContextType = Context,
  ParentType extends ResolversParentTypes["Resource"] = ResolversParentTypes["Resource"]
> = {
  __resolveType?: TypeResolveFn<
    "Author" | "Book" | "PublicUser" | "ProtectedUser",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ExternalID"], ParentType, ContextType>;
};

export type ResourceNotFoundErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["ResourceNotFoundError"] = ResolversParentTypes["ResourceNotFoundError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnythingResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Anything"] = ResolversParentTypes["Anything"]
> = {
  __resolveType?: TypeResolveFn<
    "PublicUser" | "ProtectedUser" | "Author" | "Book",
    ParentType,
    ContextType
  >;
};

export type AvatarResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["Avatar"] = ResolversParentTypes["Avatar"]
> = {
  image?: Resolver<ResolversTypes["Image"], ParentType, ContextType>;
  color?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlaggedAvatarErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["FlaggedAvatarError"] = ResolversParentTypes["FlaggedAvatarError"]
> = {
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AvatarResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["AvatarResult"] = ResolversParentTypes["AvatarResult"]
> = {
  __resolveType?: TypeResolveFn<
    "Avatar" | "FlaggedAvatarError",
    ParentType,
    ContextType
  >;
};

export type CreateUserResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["CreateUserResult"] = ResolversParentTypes["CreateUserResult"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteUserResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["DeleteUserResult"] = ResolversParentTypes["DeleteUserResult"]
> = {
  success?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["UserResult"] = ResolversParentTypes["UserResult"]
> = {
  __resolveType?: TypeResolveFn<
    "PublicUser" | "ProtectedUser" | "ResourceNotFoundError",
    ParentType,
    ContextType
  >;
};

export type UpdateUserResultResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes["UpdateUserResult"] = ResolversParentTypes["UpdateUserResult"]
> = {
  __resolveType?: TypeResolveFn<
    "ProtectedUser" | "ResourceNotFoundError" | "ValidationErrors",
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = Context> = {
  RegistrationResult?: RegistrationResultResolvers<ContextType>;
  UpdateProfileResult?: UpdateProfileResultResolvers<ContextType>;
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
  PublicUser?: PublicUserResolvers<ContextType>;
  ProtectedUser?: ProtectedUserResolvers<ContextType>;
  UpdateBookFavouriteResult?: UpdateBookFavouriteResultResolvers<ContextType>;
  BorrowBookCopyResult?: BorrowBookCopyResultResolvers<ContextType>;
  ReturnBookCopyResult?: ReturnBookCopyResultResolvers<ContextType>;
  BookResult?: BookResultResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
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
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = Context> = {
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
export type IDirectiveResolvers<ContextType = Context> = DirectiveResolvers<
  ContextType
>;
