import React from "react";

import { BookCard } from "../BookCard";
import { BookCardFragment } from "../BookCard/BookCard.fragment.generated";
import styles from "./BooksList.scss";

type Props = {
  books: BookCardFragment[];
};

export const BooksList: React.FunctionComponent<Props> = ({ books }) => (
  <div className={styles.container}>
    {books.map((book) => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
);
