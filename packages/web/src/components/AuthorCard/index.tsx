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
    <Card>
      <CardActionArea onClick={handleClick}>
        <CardMedia image={author.photo!.url} title={author.name} />
        <Typography component="h2">{author.name}</Typography>
      </CardActionArea>
    </Card>
  );
};
