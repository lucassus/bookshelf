import React from "react";
import { Link } from "react-router-dom";

import { AuthorCardFragment } from "./AuthorCard.fragment.generated";
import styles from "./AuthorCard.module.scss";

type Props = {
  author: AuthorCardFragment;
};

export const AuthorCard: React.FunctionComponent<Props> = ({ author }) => (
  <div className={styles.container}>
    {author.photo && <img src={author.photo.url} alt={author.name} />}

    <h3>
      <Link to={`/authors/${author.id}`}>{author.name}</Link>
    </h3>
  </div>
);
