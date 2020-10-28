import * as Types from "../../../../types.generated";

import {
  Avatar_Avatar_Fragment,
  Avatar_FlaggedAvatarError_Fragment
} from "../../../../components/Avatar/Avatar.fragment.generated";
import { gql } from "@apollo/client";
import { AvatarFragmentDoc } from "../../../../components/Avatar/Avatar.fragment.generated";
export type ReviewFragment = { __typename: "Review" } & Pick<
  Types.Review,
  "id" | "text" | "rating"
> & {
    author:
      | ({ __typename: "PublicUser" } & Pick<
          Types.PublicUser,
          "id" | "name"
        > & {
            avatar:
              | ({ __typename?: "Avatar" } & Avatar_Avatar_Fragment)
              | ({
                  __typename?: "FlaggedAvatarError";
                } & Avatar_FlaggedAvatarError_Fragment);
          })
      | ({ __typename: "ProtectedUser" } & Pick<
          Types.ProtectedUser,
          "id" | "name"
        > & {
            avatar:
              | ({ __typename?: "Avatar" } & Avatar_Avatar_Fragment)
              | ({
                  __typename?: "FlaggedAvatarError";
                } & Avatar_FlaggedAvatarError_Fragment);
          });
  };

export const ReviewFragmentDoc = gql`
  fragment Review on Review {
    __typename
    id
    author {
      __typename
      id
      name
      avatar {
        ...Avatar
      }
    }
    text
    rating
  }
  ${AvatarFragmentDoc}
`;
