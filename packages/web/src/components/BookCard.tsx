import {
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { Book } from "../types.generated";

const useStyles = makeStyles({
  root: {
    display: "flex"
  },
  cover: {
    height: 150,
    minWidth: 100,
    width: 100
  },
  title: {
    fontSize: 32
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
          <Typography component="h3" variant="h5" noWrap>
            {book.title}
          </Typography>

          <Typography
            component="h4"
            variant="body2"
            color="textSecondary"
            noWrap
          >
            {book.author.name}
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
};
