import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useCallback } from "react";
// @ts-ignore
import { useNavigate } from "react-router-dom";

import { Book } from "../../types.generated";
import { StarIconButton } from "../StarIconButton";
import { useUpdateBookFavouriteMutation } from "./queries.generated";

const useStyles = makeStyles({
  cardActionArea: {
    display: "flex"
  },
  cover: {
    height: 150,
    minWidth: 100,
    width: 100
  },
  content: {
    flex: "auto"
  }
});

type Props = {
  book: Book;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [updateFavourite] = useUpdateBookFavouriteMutation();

  const handleToggleFavourite = useCallback(
    () =>
      updateFavourite({
        variables: { id: book.id, favourite: !book.favourite }
      }),
    [updateFavourite, book]
  );

  const handleClick = () => navigate(`/books/${book.id}`);

  return (
    <Paper>
      <Card>
        <CardActionArea
          onClick={handleClick}
          className={classes.cardActionArea}
        >
          <CardMedia className={classes.cover} image={book.cover.url} />
          <CardContent className={classes.content}>
            <Typography component="h3" variant="h5">
              {book.title}
            </Typography>

            {book.author && (
              <Typography component="h4" variant="body2" color="textSecondary">
                Written by {book.author.name}
              </Typography>
            )}

            <StarIconButton
              labelOn="Remove from favourites"
              labelOff="Add to favourites"
              toggled={book.favourite}
              onToggle={handleToggleFavourite}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </Paper>
  );
};
