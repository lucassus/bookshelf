import * as Types from "../../types.generated";

import {
  Avatar_Avatar_Fragment,
  Avatar_FlaggedAvatarError_Fragment
} from "../Avatar/Avatar.fragment.generated";
import { gql } from "@apollo/client";
import { AvatarFragmentDoc } from "../Avatar/Avatar.fragment.generated";
export type UserCard_ProtectedUser_Fragment = {
  __typename?: "ProtectedUser";
} & Pick<Types.ProtectedUser, "email" | "isAdmin" | "name"> & {
    avatar:
      | ({ __typename?: "Avatar" } & Avatar_Avatar_Fragment)
      | ({
          __typename?: "FlaggedAvatarError";
        } & Avatar_FlaggedAvatarError_Fragment);
  };

export type UserCard_PublicUser_Fragment = { __typename?: "PublicUser" } & Pick<
  Types.PublicUser,
  "name"
> & {
    avatar:
      | ({ __typename?: "Avatar" } & Avatar_Avatar_Fragment)
      | ({
          __typename?: "FlaggedAvatarError";
        } & Avatar_FlaggedAvatarError_Fragment);
  };

export type UserCardFragment =
  | UserCard_ProtectedUser_Fragment
  | UserCard_PublicUser_Fragment;

export const UserCardFragmentDoc = gql`
  fragment UserCard on User {
    name
    avatar {
      ...Avatar
    }
    ... on ProtectedUser {
      email
      isAdmin
    }
  }
  ${AvatarFragmentDoc}
`;
