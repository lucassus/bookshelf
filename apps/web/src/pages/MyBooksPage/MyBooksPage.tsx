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

  if (error || !data || !data.currentUser) {
    return <ErrorAlert message="Could not load your books..." />;
  }

  const { currentUser } = data;

  if (currentUser.__typename === "GuestUser") {
    return null;
  }

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

      <div data-testid="borrowed-book-copies-list">
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
