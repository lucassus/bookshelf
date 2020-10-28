import * as Types from "../../../types.generated";

import { gql } from "@apollo/client";
export type ReviewFragment = { __typename: "Review" } & Pick<
  Types.Review,
  "id" | "text" | "rating"
>;

export const ReviewFragmentDoc = gql`
  fragment Review on Review {
    __typename
    id
    text
    rating
  }
`;
