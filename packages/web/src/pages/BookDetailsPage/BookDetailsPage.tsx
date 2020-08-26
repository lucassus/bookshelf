import React from "react";
import { useParams, Link } from "react-router-dom";

import { BookCopy } from "../../components/BookCopy";
import { ErrorAlert } from "../../components/ErrorAlert";
import { NotFoundPage } from "../NotFoundPage";
import styles from "./BookDetailsPage.module.scss";
import { useGetBookQuery } from "./GetBook.query.generated";

export const BookDetailsPage: React.FunctionComponent = () => {
  const params = useParams();

  const { loading, data, error } = useGetBookQuery({
    variables: { id: params.id }
  });

  if (loading) {
    return <span>Loading book...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Count not load book!" />;
  }

  const { book } = data;

  if (book.__typename === "BookNotFoundError") {
    return <NotFoundPage message="Count not found a book!" />;
  }

  return (
    <div className={styles.container}>
      <h2>{book.title}</h2>

      <div>
        <img
          className={styles.bookCover}
          src={book.cover.url}
          alt="Book cover"
        />

        <div>
          <h3>
            Written by{" "}
            <Link to={`/authors/${book.author.id}`}>{book.author.name}</Link>
          </h3>

          <p>{book.description}</p>
        </div>
      </div>

      {book.copies.length > 0 && (
        <div className={styles.bookCopiesContainer}>
          <h3>Copies</h3>

          <div className={styles.bookCopies}>
            {book.copies.map((bookCopy) => (
              <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
