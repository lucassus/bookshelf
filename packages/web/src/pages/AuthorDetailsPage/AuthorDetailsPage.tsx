import React from "react";
import { useParams } from "react-router-dom";

import { BookCard } from "../../components/BookCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import styles from "./AuthorDetailsPage.module.scss";
import { useGetAuthorQuery } from "./queries.generated";

export const AuthorDetailsPage: React.FunctionComponent = () => {
  const params = useParams();

  const { loading, data, error } = useGetAuthorQuery({
    variables: { id: params.id }
  });

  if (loading) {
    return <span>Loading author...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Count not load author!" />;
  }

  return (
    <div>
      <h2>{data.author.name}</h2>

      <div className={styles.info}>
        {data.author.photo && (
          <img src={data.author.photo.url} alt={data.author.name} />
        )}

        <article>{data.author.bio}</article>
      </div>

      {data.author.books && (
        <div className={styles.booksList}>
          {data.author.books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
