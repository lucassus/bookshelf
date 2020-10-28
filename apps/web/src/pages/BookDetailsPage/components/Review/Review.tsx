import React from "react";
import { Link } from "react-router-dom";

import { Avatar } from "../../../../components/Avatar";
import { ReviewFragment } from "./Review.fragment.generated";
import styles from "./Review.scss";

type Props = {
  review: ReviewFragment;
};

export const Review: React.FunctionComponent<Props> = ({ review }) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <Link to={`/users/${review.author.id}`}>
        <Avatar
          avatar={review.author.avatar}
          label={review.author.name}
          size="x-small"
        />
      </Link>

      <div className={styles.rating}>
        <div>
          <Link to={`/users/${review.author.id}`}>{review.author.name}</Link>
        </div>
        {review.rating && <div>rated this book {review.rating}/10</div>}
      </div>
    </div>

    <div className={styles.body}>{review.text}</div>
  </div>
);
