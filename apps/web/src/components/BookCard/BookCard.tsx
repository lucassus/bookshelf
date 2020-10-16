import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import { StarIconButton } from "../StarIconButton";
import { useAddBookToFavouritesMutation } from "./AddBookToFavourites.generated";
import { BookCardFragment } from "./BookCard.fragment.generated";
import styles from "./BookCard.scss";
import { useRemoveBookFromFavouritesMutation } from "./RemoveBookFromFavourites.generated";

type Props = {
  book: BookCardFragment;
};

// TODO: Update the db diagram
// TODO: Write e2e test
// TODO: Refactor
export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const [addToFavourites] = useAddBookToFavouritesMutation();
  const [removeFromFavourites] = useRemoveBookFromFavouritesMutation();

  // TODO: Move this logic to the button
  // TODO: Display only when a user is logged in
  const handleToggleFavourite: MouseEventHandler = (event) => {
    event.stopPropagation();

    const { id } = book;

    if (!book.isFavourite) {
      return addToFavourites({
        variables: { id },
        optimisticResponse: {
          __typename: "Mutation",
          addBookToFavourites: {
            __typename: "Book",
            id,
            isFavourite: true
          }
        }
      });
    }

    return removeFromFavourites({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        removeBookFromFavourites: {
          __typename: "Book",
          id,
          isFavourite: false
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
