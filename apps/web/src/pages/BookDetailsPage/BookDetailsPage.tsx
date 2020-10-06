import React from "react";
import { useParams, Link } from "react-router-dom";

import { BookCopyCard } from "../../components/BookCopyCard";
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

  if (book.__typename === "ResourceNotFoundError") {
    return <NotFoundPage message={book.message} />;
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
              <BookCopyCard key={bookCopy.id} bookCopy={bookCopy} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
