import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";

import { Book } from "../../types.generated";
import { StarIconButton } from "../StarIconButton";
import { useUpdateBookFavouriteMutation } from "./queries.generated";

type Props = {
  book: Book;
};

// TODO: Move to the separate module, do the same for others
export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const [updateFavourite] = useUpdateBookFavouriteMutation();

  const handleToggleFavourite = (event: MouseEvent) => {
    event.stopPropagation();

    return updateFavourite({
      variables: { id: book.id, favourite: !book.favourite }
    });
  };

  return (
    <div>
      <img src={book.cover.url} alt="Book cover" />
      <div>
        <h3>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h3>

        {book.author && <h4>Written by {book.author.name}</h4>}

        <StarIconButton
          labelOn="Remove from favourites"
          labelOff="Add to favourites"
          toggled={book.favourite}
          onToggle={handleToggleFavourite}
        />
      </div>
    </div>
  );
};
