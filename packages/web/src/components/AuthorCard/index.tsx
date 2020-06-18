import React from "react";
// @ts-ignore
import { useNavigate } from "react-router-dom";

import { Author } from "../../types.generated";

type Props = {
  author: Author;
};

export const AuthorCard: React.FunctionComponent<Props> = ({ author }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/authors/${author.id}`);

  return (
    <div onClick={handleClick}>
      {author.photo && <img src={author.photo.url} alt={author.name} />}
      <h2>{author.name}</h2>
    </div>
  );
};
