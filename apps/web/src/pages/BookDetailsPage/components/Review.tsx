import React from "react";

import { ReviewFragment } from "./Review.fragment.generated";

type Props = {
  review: ReviewFragment;
};

export const Review: React.FunctionComponent<Props> = ({ review }) => (
  <>
    <dt>Rating</dt>
    <dd>{review.rating}</dd>

    <dt>Text</dt>
    <dd>{review.text}</dd>
  </>
);
