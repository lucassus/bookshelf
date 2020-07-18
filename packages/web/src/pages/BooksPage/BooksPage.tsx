import React, { useMemo } from "react";
import { useParams } from "react-router";

import { BookCard } from "../../components/BookCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import { Pager } from "../../components/Pager";
import styles from "./BooksPage.module.scss";
import { useGetBooksQuery } from "./GetBooks.query.generated";

const PER_PAGE = 8;

export const BooksPage: React.FunctionComponent = () => {
  const params = useParams();

  const currentPage = params.page ? parseInt(params.page, 10) : 1;
  const { loading, data, error, refetch } = useGetBooksQuery({
    variables: { limit: PER_PAGE, offset: (currentPage - 1) * PER_PAGE }
  });

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

      <Pager
        currentPage={currentPage}
        totalPages={totalPages}
        buildPathFor={(page) => (page === 1 ? "/" : `/page/${page}`)}
      />

      <div className={styles.list}>
        {data.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};
