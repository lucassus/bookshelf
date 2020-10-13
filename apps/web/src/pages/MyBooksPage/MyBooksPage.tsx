import React from "react";

import { BookCopiesList } from "../../components/BookCopiesList";
import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetMyBookCopiesQuery } from "./GetMyBookCopies.query.generated";

export const MyBooksPage: React.FunctionComponent = () => {
  // TODO: It loads the query twice, see https://github.com/apollographql/apollo-client/issues/6832
  const { data, error, loading } = useGetMyBookCopiesQuery({
    fetchPolicy: "cache-and-network"
  });

  if (loading && data === undefined) {
    return <span>Loading...</span>;
  }

  if (error || data === undefined || !data.currentUser) {
    return <ErrorAlert message="Could not load your books..." />;
  }

  const { ownedBookCopies, borrowedBookCopies } = data.currentUser;

  return (
    <div>
      <div data-testid="owned-book-copies-list">
        <h2>Owned book copies ({ownedBookCopies.length})</h2>
        <BookCopiesList bookCopies={ownedBookCopies} />
      </div>

      <div data-testid="borrowed-book-copies-list">
        <h2>Borrowed book copies ({borrowedBookCopies.length})</h2>
        <BookCopiesList bookCopies={borrowedBookCopies} />
      </div>
    </div>
  );
};
