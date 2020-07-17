import React from "react";

import { Avatar } from "../Avatar";
import { BookCopyFragment } from "./BookCopy.fragment.generated";
import styles from "./BookCopy.module.scss";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BookCopy: React.FunctionComponent<Props> = ({ bookCopy }) => (
  <div className={styles.container}>
    <img src={bookCopy.book.cover.url} alt={bookCopy.book.title} />

    <Avatar name={bookCopy.owner.name} small avatar={bookCopy.owner.avatar} />

    {bookCopy.borrower && (
      <Avatar
        name={bookCopy.borrower.name}
        small
        avatar={bookCopy.borrower.avatar}
      />
    )}
  </div>
);
