import * as Types from "../../types.generated";

import { gql } from "@apollo/client";
export type Avatar_Avatar_Fragment = { __typename: "Avatar" } & Pick<
  Types.Avatar,
  "color"
> & { image: { __typename?: "Image" } & Pick<Types.Image, "path"> };

export type Avatar_FlaggedAvatarError_Fragment = {
  __typename: "FlaggedAvatarError";
} & Pick<Types.FlaggedAvatarError, "message">;

export type AvatarFragment =
  | Avatar_Avatar_Fragment
  | Avatar_FlaggedAvatarError_Fragment;

export const AvatarFragmentDoc = gql`
  fragment Avatar on AvatarResult {
    __typename
    ... on FlaggedAvatarError {
      message
    }
    ... on Avatar {
      image {
        path
      }
      color
    }
  }
`;
