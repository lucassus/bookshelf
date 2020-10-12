import * as Types from "../../types.generated";

import { gql } from "@apollo/client";
export type AuthorCardFragment = { __typename?: "Author" } & Pick<
  Types.Author,
  "id" | "name"
> & { photo: { __typename?: "Image" } & Pick<Types.Image, "url"> };

export const AuthorCardFragmentDoc = gql`
  fragment AuthorCard on Author {
    id
    name
    photo {
      url
    }
  }
`;
