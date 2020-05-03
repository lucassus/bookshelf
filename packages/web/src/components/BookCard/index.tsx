import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { Book } from "../../types.generated";
import { useUpdateBookFavouriteMutation } from "./queries.generated";

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

  const [updateFavourite] = useUpdateBookFavouriteMutation();

  return (
    <Paper>
      <Card className={classes.root}>
        <CardMedia className={classes.cover} image={book.cover.url} />
        <CardContent>
          <Typography component="h3" variant="h5" noWrap>
            {book.title}
          </Typography>

          {book.author && (
            <Typography
              component="h4"
              variant="body2"
              color="textSecondary"
              noWrap
            >
              {book.author.name}
            </Typography>
          )}

          <Button
            onClick={() =>
              updateFavourite({
                variables: { id: book.id, favourite: !book.favourite }
              })
            }
          >
            {book.favourite ? "Remove from favourites" : "Add to favourites"}
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
};
