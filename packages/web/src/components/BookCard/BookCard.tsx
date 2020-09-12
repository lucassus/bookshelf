import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";

import { StarIconButton } from "../StarIconButton";
import { BookCardFragment } from "./BookCard.fragment.generated";
import styles from "./BookCard.module.scss";
import { useUpdateBookFavouriteMutation } from "./UpdateBookFavourite.mutation.generated";

type Props = {
  book: BookCardFragment;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const [updateFavourite] = useUpdateBookFavouriteMutation();

  const handleToggleFavourite = (event: MouseEvent) => {
    event.stopPropagation();

    const { id } = book;
    const favourite = !book.favourite;

    return updateFavourite({
      variables: { id, favourite },
      optimisticResponse: {
        __typename: "Mutation",
        updateBookFavourite: {
          __typename: "UpdateBookFavouriteResult",
          success: true,
          message: favourite
            ? "Book was added to favourites."
            : "Book was removed from favourites.",
          book: {
            __typename: "Book",
            id,
            favourite
          }
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
