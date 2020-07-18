import qs from "query-string";
import React, { useCallback, useMemo } from "react";
import { useLocation } from "react-router";

import { BookCard } from "../../components/BookCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import { Pager } from "../../components/Pager";
import styles from "./BooksPage.module.scss";
import { useGetBooksQuery } from "./GetBooks.query.generated";

const PER_PAGE = 8;

export const BooksPage: React.FunctionComponent = () => {
  // TODO: Figure out how to make it nicer
  const location = useLocation();
  const params = qs.parse(location.search);
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const offset = (page - 1) * PER_PAGE;

  const { loading, data, error, fetchMore, refetch } = useGetBooksQuery({
    variables: { limit: PER_PAGE, offset }
  });

  // TODO: Keep the current page in the url
  const handlePageChange = useCallback(
    (nextPage: number) => {
      const nextOffset = (nextPage - 1) * PER_PAGE;

      return fetchMore({
        variables: { offset: nextOffset },
        updateQuery: (prev, { fetchMoreResult }): any => fetchMoreResult
      });
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
      <h2>Books</h2>

      <div className={styles.list}>
        {data.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      <Pager onChange={handlePageChange} count={totalPages} />
    </div>
  );
};
