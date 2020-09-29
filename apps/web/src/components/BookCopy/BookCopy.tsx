import React from "react";
import { Link } from "react-router-dom";

import { Avatar } from "../Avatar";
import { useCurrentUser } from "../CurrentUserProvider";
import { Actions } from "./Actions";
import { BookCopyFragment } from "./BookCopy.fragment.generated";
import styles from "./BookCopy.module.scss";
import { BookCopyUser } from "./BookCopyUser";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BookCopy: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const currentUser = useCurrentUser();

  return (
    <div
      className={styles.container}
      data-testid={`book-copy:${bookCopy.book.title}`}
    >
      <div className={styles.bookCoverWithAvatars}>
        <Link to={`/books/${bookCopy.book.id}`}>
          <img src={bookCopy.book.cover.url} alt={bookCopy.book.title} />
        </Link>

        <div className={styles.ownerAvatar}>
          <BookCopyUser user={bookCopy.owner} />
        </div>

        {bookCopy.borrower && (
          <div className={styles.borrowerAvatar}>
            <BookCopyUser user={bookCopy.borrower} />
          </div>
        )}
      </div>

      {currentUser && bookCopy.owner.id !== currentUser.id && (
        <Actions bookCopy={bookCopy} />
      )}
    </div>
  );
};
