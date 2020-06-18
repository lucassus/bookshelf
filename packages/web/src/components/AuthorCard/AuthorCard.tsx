import React from "react";
import { Link } from "react-router-dom";

import { Author } from "../../types.generated";
import styles from "./AuthorCard.module.scss";

type Props = {
  author: Author;
};

export const AuthorCard: React.FunctionComponent<Props> = ({ author }) => (
  <div className={styles.container}>
    {author.photo && <img src={author.photo.url} alt={author.name} />}
    <h3>
      <Link to={`/authors/${author.id}`}>{author.name}</Link>
    </h3>
  </div>
);
