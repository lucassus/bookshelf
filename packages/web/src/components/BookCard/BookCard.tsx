import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";

import { Book } from "../../types.generated";
import { StarIconButton } from "../StarIconButton";
import styles from "./BookCard.module.scss";
import { useUpdateBookFavouriteMutation } from "./queries.generated";

type Props = {
  book: Book;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const [updateFavourite] = useUpdateBookFavouriteMutation();

  const handleToggleFavourite = (event: MouseEvent) => {
    event.stopPropagation();

    return updateFavourite({
      variables: { id: book.id, favourite: !book.favourite }
    });
  };

  return (
    <div className={styles.container}>
      <Link to={`/books/${book.id}`}>
        <img src={book.cover.url} alt="Book cover" />
      </Link>

      <div>
        <h3>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h3>

        {book.author && (
          <span>
            Written by{" "}
            <Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
          </span>
        )}

        <div className={styles.buttons}>
          <StarIconButton
            labelOn="Remove from favourites"
            labelOff="Add to favourites"
            toggled={book.favourite}
            onToggle={handleToggleFavourite}
          />
        </div>
      </div>
    </div>
  );
};
