import React from "react";
import { useParams, Link } from "react-router-dom";

import { BookCopy } from "../../components/BookCopy";
import { ErrorAlert } from "../../components/ErrorAlert";
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

  return (
    <div>
      <h2>{data.book.title}</h2>

      <div className={styles.details}>
        <img
          className={styles.bookCover}
          src={data.book.cover.url}
          alt="Book cover"
        />

        <div>
          {data.book.author && (
            <h3>
              Written by{" "}
              <Link to={`/authors/${data.book.author.id}`}>
                {data.book.author.name}
              </Link>
            </h3>
          )}

          <p>{data.book.description}</p>

          <h2>Copies</h2>

          {data.book.copies.map((bookCopy) => (
            <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
          ))}
        </div>
      </div>
    </div>
  );
};
