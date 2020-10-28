import React from "react";

import { Avatar } from "../../../components/Avatar";
import { ReviewFragment } from "./Review.fragment.generated";

type Props = {
  review: ReviewFragment;
};

export const Review: React.FunctionComponent<Props> = ({ review }) => (
  <>
    <dt>Author</dt>
    <dd>
      <Avatar
        avatar={review.author.avatar}
        label={review.author.name}
        size="x-small"
      />
      {review.author.name}
    </dd>

    <dt>Rating</dt>
    <dd>{review.rating}</dd>

    <dt>Text</dt>
    <dd>{review.text}</dd>
  </>
);
