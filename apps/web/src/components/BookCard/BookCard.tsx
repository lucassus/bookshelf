import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import { StarIconButton } from "../StarIconButton";
import { BookCardFragment } from "./BookCard.fragment.generated";
import styles from "./BookCard.scss";
import { useUpdateBookFavouriteMutation } from "./UpdateBookFavourite.mutation.generated";

type Props = {
  book: BookCardFragment;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const [updateFavourite] = useUpdateBookFavouriteMutation();

  // TODO: Move this logic to the button
  // TODO: Display only when a user is logged in
  const handleToggleFavourite: MouseEventHandler = (event) => {
    event.stopPropagation();

    const { id } = book;
    const isFavourite = !book.isFavourite;

    return updateFavourite({
      variables: { id, isFavourite },
      optimisticResponse: {
        __typename: "Mutation",
        updateBookFavourite: {
          __typename: "Book",
          id,
          isFavourite
        }
      }
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

        <span>
          Written by{" "}
          <Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
        </span>

        {book.isFavourite !== null && (
          <div className={styles.buttons}>
            <StarIconButton
              labelOn="Remove from favourites"
              labelOff="Add to favourites"
              toggled={book.isFavourite}
              onToggle={handleToggleFavourite}
            />
          </div>
        )}
      </div>
    </div>
  );
};
