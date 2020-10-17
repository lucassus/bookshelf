import * as Types from "../../types.generated";

import {
  Avatar_Avatar_Fragment,
  Avatar_FlaggedAvatarError_Fragment
} from "../Avatar/Avatar.fragment.generated";
import { gql } from "@apollo/client";
import { AvatarFragmentDoc } from "../Avatar/Avatar.fragment.generated";
export type BookCopyUser_PublicUser_Fragment = {
  __typename?: "PublicUser";
} & Pick<Types.PublicUser, "id" | "name"> & {
    avatar:
      | ({ __typename?: "Avatar" } & Avatar_Avatar_Fragment)
      | ({
          __typename?: "FlaggedAvatarError";
        } & Avatar_FlaggedAvatarError_Fragment);
  };

export type BookCopyUser_ProtectedUser_Fragment = {
  __typename?: "ProtectedUser";
} & Pick<Types.ProtectedUser, "id" | "name"> & {
    avatar:
      | ({ __typename?: "Avatar" } & Avatar_Avatar_Fragment)
      | ({
          __typename?: "FlaggedAvatarError";
        } & Avatar_FlaggedAvatarError_Fragment);
  };

export type BookCopyUserFragment =
  | BookCopyUser_PublicUser_Fragment
  | BookCopyUser_ProtectedUser_Fragment;

export const BookCopyUserFragmentDoc = gql`
  fragment BookCopyUser on User {
    id
    name
    avatar {
      ...Avatar
    }
  }
  ${AvatarFragmentDoc}
`;
