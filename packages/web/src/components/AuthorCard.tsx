import { Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { Author } from "../types";

const useStyles = makeStyles({
  media: {
    height: 200,
    width: 200
  }
});

type Props = {
  author: Author;
};

export const AuthorCard: React.FunctionComponent<Props> = ({ author }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={author.photo.url}
          title={author.name}
        />
        <Typography component="h2">{author.name}</Typography>
      </CardActionArea>
    </Card>
  );
};
