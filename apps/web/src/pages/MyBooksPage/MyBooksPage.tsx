import React from "react";

import { BookCopyCard } from "../../components/BookCopyCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetMyBookCopiesQuery } from "./GetMyBookCopies.query.generated";
import styles from "./MyBooksPage.module.scss";

export const MyBooksPage: React.FunctionComponent = () => {
  const { data, error, loading } = useGetMyBookCopiesQuery();

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Could not load your books..." />;
  }

  const { currentUser } = data;

  if (currentUser.__typename === "GuestUser") {
    return null;
  }

  const { ownedBookCopies, borrowedBookCopies } = currentUser;

  return (
    <div>
      <div data-testid="owned-book-copies-list">
        <h2>Owned book copies ({ownedBookCopies.length})</h2>

        <div className={styles.bookCopies}>
          {ownedBookCopies.map((bookCopy) => (
            <BookCopyCard key={bookCopy.id} bookCopy={bookCopy} />
          ))}
        </div>
      </div>

      <div data-testid="borrowed-book-copies-list">
        <h2>Borrowed book copies ({borrowedBookCopies.length})</h2>

        <div className={styles.bookCopies}>
          {borrowedBookCopies.map((bookCopy) => (
            <BookCopyCard key={bookCopy.id} bookCopy={bookCopy} />
          ))}
        </div>
      </div>
    </div>
  );
};
