import * as Types from "../../types.generated";

import { ResourceImageFragmentFragment } from "./ResourceImage.fragment.generated";
import { gql } from "@apollo/client";
import { ResourceImageFragmentFragmentDoc } from "./ResourceImage.fragment.generated";
export type ResourceCard_Author_Fragment = { __typename: "Author" } & Pick<
  Types.Author,
  "name" | "id"
> & { description: Types.Author["bio"] } & {
    image: { __typename?: "Image" } & ResourceImageFragmentFragment;
  };

export type ResourceCard_Book_Fragment = { __typename: "Book" } & Pick<
  Types.Book,
  "description" | "id"
> & { name: Types.Book["title"] } & {
    image: { __typename?: "Image" } & ResourceImageFragmentFragment;
  };

export type ResourceCard_ProtectedUser_Fragment = {
  __typename: "ProtectedUser";
} & Pick<Types.ProtectedUser, "name" | "id"> & {
    description: Types.ProtectedUser["info"];
  } & {
    avatar:
      | ({ __typename?: "Avatar" } & {
          image: { __typename?: "Image" } & ResourceImageFragmentFragment;
        })
      | { __typename?: "FlaggedAvatarError" };
  };

export type ResourceCard_PublicUser_Fragment = {
  __typename: "PublicUser";
} & Pick<Types.PublicUser, "name" | "id"> & {
    description: Types.PublicUser["info"];
  } & {
    avatar:
      | ({ __typename?: "Avatar" } & {
          image: { __typename?: "Image" } & ResourceImageFragmentFragment;
        })
      | { __typename?: "FlaggedAvatarError" };
  };

export type ResourceCardFragment =
  | ResourceCard_Author_Fragment
  | ResourceCard_Book_Fragment
  | ResourceCard_ProtectedUser_Fragment
  | ResourceCard_PublicUser_Fragment;

export const ResourceCardFragmentDoc = gql`
  fragment ResourceCard on Resource {
    __typename
    id
    ... on PublicUser {
      name
      description: info
      avatar {
        ... on Avatar {
          image {
            ...ResourceImageFragment
          }
        }
      }
    }
    ... on ProtectedUser {
      name
      description: info
      avatar {
        ... on Avatar {
          image {
            ...ResourceImageFragment
          }
        }
      }
    }
    ... on Author {
      name
      description: bio
      image: photo {
        ...ResourceImageFragment
      }
    }
    ... on Book {
      name: title
      description
      image: cover {
        ...ResourceImageFragment
      }
    }
  }
  ${ResourceImageFragmentFragmentDoc}
`;
