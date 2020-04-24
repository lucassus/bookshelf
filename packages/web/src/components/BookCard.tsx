import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { Book } from "../generated/graphql";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  cover: {
    height: 100,
    minWidth: 100,
    width: 100
  }
});

type Props = {
  book: Book;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const classes = useStyles();

  return (
    <Paper>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={book.cover.url} />
        <CardContent>
          <Typography component="h3" noWrap>
            {book.title}
          </Typography>

          {book.author && (
            <Typography component="h4" noWrap>
              {book.author.name}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
};
