import { Image, Transformation } from "cloudinary-react";
import React from "react";
import { Link } from "react-router-dom";

import { Card } from "../Card";
import { useCurrentUser } from "../CurrentUserProvider";
import { FavouriteBookButton } from "../FavouriteBookButton";
import { BookCardFragment } from "./BookCard.fragment.generated";
import styles from "./BookCard.module.scss";

type Props = {
  book: BookCardFragment;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  const currentUser = useCurrentUser();

  return (
    <Card className={styles.container} data-testid={`book-card:${book.title}`}>
      <Link to={`/books/${book.id}`}>
        <Image publicId={book.cover.path} alt="Book cover">
          <Transformation width={100} height={150} crop="scale" />
        </Image>
      </Link>

      <div>
        <h3>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h3>

        <div>
          Written by{" "}
          <Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
        </div>

        {book.averageRating && (
          <div>
            {book.averageRating.toFixed(1)} ({book.reviewsCount} ratings)
          </div>
        )}

        {currentUser && (
          <div className={styles.buttons}>
            <FavouriteBookButton book={book} />
          </div>
        )}
      </div>
    </Card>
  );
};
