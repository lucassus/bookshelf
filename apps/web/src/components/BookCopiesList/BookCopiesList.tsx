import React from "react";

import { BookCopyCard } from "../BookCopyCard";
import { BookCopyCardFragment } from "../BookCopyCard/BookCopyCard.fragment.generated";
import styles from "./BookCopiesList.scss";

type Props = {
  bookCopies: BookCopyCardFragment[];
};

export const BookCopiesList: React.FunctionComponent<Props> = ({
  bookCopies
}) => (
  <div className={styles.container}>
    {bookCopies.map((bookCopy) => (
      <BookCopyCard key={bookCopy.id} bookCopy={bookCopy} />
    ))}
  </div>
);
