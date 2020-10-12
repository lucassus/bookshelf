import * as Types from "../../types.generated";

import {
  Avatar_Avatar_Fragment,
  Avatar_FlaggedAvatarError_Fragment
} from "../Avatar/Avatar.fragment.generated";
import { gql } from "@apollo/client";
import { AvatarFragmentDoc } from "../Avatar/Avatar.fragment.generated";
export type CurrentUserFragment = { __typename?: "ProtectedUser" } & Pick<
  Types.ProtectedUser,
  "id" | "name" | "email" | "isAdmin" | "info"
> & {
    avatar:
      | ({ __typename?: "Avatar" } & Avatar_Avatar_Fragment)
      | ({
          __typename?: "FlaggedAvatarError";
        } & Avatar_FlaggedAvatarError_Fragment);
  };

export const CurrentUserFragmentDoc = gql`
  fragment CurrentUser on ProtectedUser {
    id
    name
    email
    isAdmin
    info
    isAdmin
    avatar {
      ...Avatar
    }
  }
  ${AvatarFragmentDoc}
`;
