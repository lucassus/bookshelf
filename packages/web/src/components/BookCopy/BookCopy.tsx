import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../AuthContext";
import { Avatar } from "../Avatar";
import { Actions } from "./Actions";
import { BookCopyFragment } from "./BookCopy.fragment.generated";
import styles from "./BookCopy.module.scss";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BookCopy: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.bookCoverWithAvatars}>
        <Link to={`/books/${bookCopy.book.id}`}>
          <img src={bookCopy.book.cover.url} alt={bookCopy.book.title} />
        </Link>

        <div className={styles.ownerAvatar}>
          <Link to={`/users/${bookCopy.owner.id}`}>
            <Avatar
              label={bookCopy.owner.name}
              size="small"
              avatar={bookCopy.owner.avatar}
            />
          </Link>
        </div>

        {bookCopy.borrower && (
          <div className={styles.borrowerAvatar}>
            <Link to={`/users/${bookCopy.borrower.id}`}>
              <Avatar
                label={bookCopy.borrower.name}
                size="small"
                avatar={bookCopy.borrower.avatar}
              />
            </Link>
          </div>
        )}
      </div>

      {currentUser && <Actions bookCopy={bookCopy} />}
    </div>
  );
};
