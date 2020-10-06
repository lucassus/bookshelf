import React from "react";
import { Link } from "react-router-dom";

import { useCurrentUser } from "../CurrentUserProvider";
import { Actions } from "./Actions";
import { BookCopyFragment } from "./BookCopyCard.fragment.generated";
import styles from "./BookCopyCard.module.scss";
import { BookCopyUser } from "./BookCopyUser";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BookCopyCard: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const currentUser = useCurrentUser();

  return (
    <div
      className={styles.container}
      data-testid={`book-copy-card:${bookCopy.book.title}`}
    >
      <div className={styles.bookCoverWithAvatars}>
        <Link to={`/books/${bookCopy.book.id}`}>
          <img src={bookCopy.book.cover.url} alt={bookCopy.book.title} />
        </Link>

        <div className={styles.ownerAvatar} data-testid="book-copy-card-owner">
          <BookCopyUser user={bookCopy.owner} />
        </div>

        {bookCopy.borrower && (
          <div
            className={styles.borrowerAvatar}
            data-testid="book-copy-card-borrower"
          >
            <BookCopyUser user={bookCopy.borrower} />
          </div>
        )}
      </div>

      {currentUser && bookCopy.owner.id !== currentUser.id && (
        <Actions currentUser={currentUser} bookCopy={bookCopy} />
      )}
    </div>
  );
};
