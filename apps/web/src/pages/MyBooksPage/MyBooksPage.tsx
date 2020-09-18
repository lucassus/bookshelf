import React from "react";

import { BookCopy } from "../../components/BookCopy";
import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetMyBookCopiesQuery } from "./GetMyBookCopies.query.generated";
import styles from "./MyBooksPage.module.scss";

export const MyBooksPage: React.FunctionComponent = () => {
  const { data, error, loading } = useGetMyBookCopiesQuery();

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Could not load books..." />;
  }

  // TODO: Find a better solution for loading my book copies
  const currentUser = data.currentUser!;
  const { ownedBookCopies, borrowedBookCopies } = currentUser;

  return (
    <div>
      <div>
        <h2>Owned book copies ({ownedBookCopies.length})</h2>

        <div className={styles.bookCopies}>
          {ownedBookCopies.map((bookCopy) => (
            <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
          ))}
        </div>
      </div>

      <div>
        <h2>Borrowed book copies ({borrowedBookCopies.length})</h2>

        <div className={styles.bookCopies}>
          {borrowedBookCopies.map((bookCopy) => (
            <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
          ))}
        </div>
      </div>
    </div>
  );
};
