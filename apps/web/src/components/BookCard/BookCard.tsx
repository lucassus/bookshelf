import React from "react";
import { Link } from "react-router-dom";

import { useCurrentUser } from "../CurrentUserProvider";
import { FavouriteBookButton } from "../FavouriteBookButton";
import { BookCardFragment } from "./BookCard.fragment.generated";
import styles from "./BookCard.scss";

type Props = {
  book: BookCardFragment;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.container} data-testid={`book-card:${book.title}`}>
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

        {currentUser && (
          <div className={styles.buttons}>
            <FavouriteBookButton book={book} />
          </div>
        )}
      </div>
    </div>
  );
};
