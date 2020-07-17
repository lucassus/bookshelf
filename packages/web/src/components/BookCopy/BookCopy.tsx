import React from "react";

import { Avatar } from "../Avatar";
import { BookCopyFragment } from "./BookCopy.fragment.generated";
import styles from "./BookCopy.module.scss";

type Props = {
  bookCopy: BookCopyFragment;
};

// TODO: Display links to users
export const BookCopy: React.FunctionComponent<Props> = ({ bookCopy }) => (
  <div className={styles.container}>
    <img src={bookCopy.book.cover.url} alt={bookCopy.book.title} />

    <div className={styles.ownerAvatar}>
      <Avatar name={bookCopy.owner.name} small avatar={bookCopy.owner.avatar} />
    </div>

    {bookCopy.borrower && (
      <div className={styles.borrowerAvatar}>
        <Avatar
          name={bookCopy.borrower.name}
          small
          avatar={bookCopy.borrower.avatar}
        />
      </div>
    )}
  </div>
);
