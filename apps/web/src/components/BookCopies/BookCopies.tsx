import React from "react";

import { BookCopyCard } from "../BookCopyCard";
import { BookCopyCardFragment } from "../BookCopyCard/BookCopyCard.fragment.generated";
import styles from "./BookCopies.module.scss";

type Props = {
  bookCopies: BookCopyCardFragment[];
};

export const BookCopies: React.FunctionComponent<Props> = ({ bookCopies }) => (
  <div className={styles.container}>
    {bookCopies.map((bookCopy) => (
      <BookCopyCard key={bookCopy.id} bookCopy={bookCopy} />
    ))}
  </div>
);
