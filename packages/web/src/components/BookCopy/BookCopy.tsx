import React from "react";
import { Link } from "react-router-dom";

import { Avatar } from "../Avatar";
import { BookCopyFragment } from "./BookCopy.fragment.generated";
import styles from "./BookCopy.module.scss";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BookCopy: React.FunctionComponent<Props> = ({ bookCopy }) => (
  <div className={styles.container}>
    <Link to={`/books/${bookCopy.book.id}`}>
      <img src={bookCopy.book.cover.url} alt={bookCopy.book.title} />
    </Link>

    <div className={styles.ownerAvatar}>
      <Link to={`/users/${bookCopy.owner.id}`}>
        <Avatar
          name={bookCopy.owner.name}
          small
          avatar={bookCopy.owner.avatar}
        />
      </Link>
    </div>

    {bookCopy.borrower && (
      <div className={styles.borrowerAvatar}>
        <Link to={`/users/${bookCopy.borrower.id}`}>
          <Avatar
            name={bookCopy.borrower.name}
            small
            avatar={bookCopy.borrower.avatar}
          />
        </Link>
      </div>
    )}
  </div>
);
