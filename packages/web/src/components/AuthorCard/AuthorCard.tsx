import React from "react";
import { Link } from "react-router-dom";

import styles from "./AuthorCard.module.scss";
import { AuthorFieldsFragment } from "./AuthorFields.generated";

type Props = {
  author: AuthorFieldsFragment;
};

export const AuthorCard: React.FunctionComponent<Props> = ({ author }) => (
  <div className={styles.container}>
    {author.photo && <img src={author.photo.url} alt={author.name} />}

    <h3>
      <Link to={`/authors/${author.id}`}>{author.name}</Link>
    </h3>
  </div>
);
