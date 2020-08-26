import React from "react";
import { useParams } from "react-router-dom";

import { BookCard } from "../../components/BookCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import styles from "./AuthorDetailsPage.module.scss";
import { useGetAuthorQuery } from "./GetAuthor.query.generated";

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

  const { author } = data;

  // TODO: Create a nice 404 page
  if (author.__typename === "AuthorNotFoundError") {
    return <ErrorAlert message="Count not find author!" />;
  }

  return (
    <div>
      <h2>{author.name}</h2>

      <div className={styles.info}>
        {author.photo && <img src={author.photo.url} alt={author.name} />}

        <article>{author.bio}</article>
      </div>

      {author.books && (
        <div className={styles.booksList}>
          {author.books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};
