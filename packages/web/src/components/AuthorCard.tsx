import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  ButtonBase
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Author } from "../generated/graphql";

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
    <ButtonBase to={`/authors/${author.id}`} component={RouterLink} p={0}>
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
    </ButtonBase>
  );
};
