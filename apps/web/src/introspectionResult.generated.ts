export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    RegistrationResult: ["ProtectedUser", "ValidationErrors"],
    UpdateProfileResult: ["ProtectedUser", "ValidationErrors"],
    LoginResult: ["LoginSuccess", "LoginFailure"],
    AuthorResponse: ["Author", "ResourceNotFoundError"],
    User: ["ProtectedUser", "PublicUser"],
    UpdateBookFavouriteResult: ["Book", "MutationError"],
    BorrowBookCopyResult: ["BookCopy", "MutationError"],
    ReturnBookCopyResult: ["BookCopy", "MutationError"],
    BookResult: ["Book", "ResourceNotFoundError"],
    Timestampable: [
      "Author",
      "Book",
      "BookCopy",
      "ProtectedUser",
      "PublicUser"
    ],
    Error: [
      "MutationError",
      "ValidationError",
      "ResourceNotFoundError",
      "FlaggedAvatarError"
    ],
    MutationResponse: ["CreateUserResult", "DeleteUserResult"],
    Resource: ["Author", "Book", "ProtectedUser", "PublicUser"],
    Anything: ["PublicUser", "ProtectedUser", "Author", "Book"],
    AvatarResult: ["Avatar", "FlaggedAvatarError"],
    UserResult: ["PublicUser", "ProtectedUser", "ResourceNotFoundError"],
    UpdateUserResult: [
      "ProtectedUser",
      "ResourceNotFoundError",
      "ValidationErrors"
    ]
  }
};
export default result;
