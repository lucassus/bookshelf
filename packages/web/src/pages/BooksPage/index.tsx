import React, { useCallback, useMemo } from "react";

import { BookCard } from "../../components/BookCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetBooksQuery } from "./queries.generated";
import { Pagination } from "../../components/Pagination";

const PER_PAGE = 8;

export const BooksPage: React.FunctionComponent = () => {
  const { loading, data, error, fetchMore, refetch } = useGetBooksQuery({
    variables: { limit: PER_PAGE }
  });

  const handlePageChange = useCallback(
    (page: number) => {
      const offset = (page - 1) * PER_PAGE;
      return fetchMore({ variables: { offset } });
    },
    [fetchMore]
  );

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.booksCount / PER_PAGE) : 1),
    [data]
  );

  if (loading) {
    return <span>Loading books...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Could not load books..." onRetry={refetch} />;
  }

  return (
    <div>
      <h4>Books</h4>

      {data.books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}

      <Pagination onChange={handlePageChange} count={totalPages} />
    </div>
  );
};
