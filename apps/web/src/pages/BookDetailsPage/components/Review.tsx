import React from "react";
import { Link } from "react-router-dom";

import { Avatar } from "../../../components/Avatar";
import { ReviewFragment } from "./Review.fragment.generated";

type Props = {
  review: ReviewFragment;
};

export const Review: React.FunctionComponent<Props> = ({ review }) => (
  <div>
    <div>
      <Link to={`/users/${review.author.id}`}>
        <Avatar
          avatar={review.author.avatar}
          label={review.author.name}
          size="x-small"
        />
        <span>{review.author.name}</span>
      </Link>

      {review.rating !== null && (
        <span>rated this book {review.rating}/10</span>
      )}
    </div>

    <div>{review.text}</div>
  </div>
);
