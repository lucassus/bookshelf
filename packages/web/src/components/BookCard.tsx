import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import { Book } from "../types.generated";
import { useUpdateBookFavouriteMutation } from "./BookCard.queries.generated";

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

  const [favourite, setFavourite] = useState(book.favourite);
  const [updateFavourite, { loading }] = useUpdateBookFavouriteMutation();

  // TODO: Implement optimistic updates
  const handleUpdateFavourite = async () => {
    const updatedFavourite = !favourite;

    await updateFavourite({
      variables: {
        id: book.id,
        favourite: updatedFavourite
      }
    });

    setFavourite(updatedFavourite);
  };

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

          <Button onClick={handleUpdateFavourite} disabled={loading}>
            Favourite: {favourite ? "true" : "false"}
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
};
