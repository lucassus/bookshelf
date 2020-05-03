import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from "@material-ui/icons";
import React, { useCallback } from "react";

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

  const handleToggleFavourite = useCallback(
    () =>
      updateFavourite({
        variables: { id: book.id, favourite: !book.favourite }
      }),
    [updateFavourite, book]
  );

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

          <IconButton
            onClick={handleToggleFavourite}
            aria-label={
              book.favourite ? "Remove from favourites" : "Add to favourites"
            }
          >
            {book.favourite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </CardContent>
      </Card>
    </Paper>
  );
};
