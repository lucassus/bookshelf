import React from "react";
import { useParams } from "react-router-dom";

import { BooksList } from "../../components/BooksList";
import { ErrorAlert } from "../../components/ErrorAlert";
import { NotFoundPage } from "../NotFoundPage";
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

  if (author.__typename === "ResourceNotFoundError") {
    return <NotFoundPage message={author.message} />;
  }

  return (
    <div>
      <h2>{author.name}</h2>

      <div className={styles.info}>
        <img src={author.photo.url} alt={author.name} />
        <article>{author.bio}</article>
      </div>

      {author.books.length > 0 && <BooksList books={author.books} />}
    </div>
  );
};
