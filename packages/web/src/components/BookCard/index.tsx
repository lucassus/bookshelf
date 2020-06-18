import React, { MouseEvent } from "react";
// @ts-ignore
import { useNavigate } from "react-router-dom";

import { Book } from "../../types.generated";
import { StarIconButton } from "../StarIconButton";
import { useUpdateBookFavouriteMutation } from "./queries.generated";

type Props = {
  book: Book;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const navigate = useNavigate();

  const [updateFavourite] = useUpdateBookFavouriteMutation();

  const handleToggleFavourite = (event: MouseEvent) => {
    event.stopPropagation();

    updateFavourite({
      variables: { id: book.id, favourite: !book.favourite }
    });
  };

  const handleClick = () => navigate(`/books/${book.id}`);

  return (
    <Paper>
      <Card>
        <CardActionArea
          onClick={handleClick}
          component="div"
          className={classes.cardActionArea}
        >
          <CardMedia image={book.cover.url} />
          <CardContent>
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
