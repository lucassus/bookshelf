import React from "react";
import { Link } from "react-router-dom";

import { Author } from "../../types.generated";

type Props = {
  author: Author;
};

export const AuthorCard: React.FunctionComponent<Props> = ({ author }) => (
  <div>
    {author.photo && <img src={author.photo.url} alt={author.name} />}
    <h3>
      <Link to={`/authors/${author.id}`}>{author.name}</Link>
    </h3>
  </div>
);
