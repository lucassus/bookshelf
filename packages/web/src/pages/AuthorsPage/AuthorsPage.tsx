import React from "react";

import { AuthorCard } from "../../components/AuthorCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import styles from "./AuthorsPage.module.scss";
import { useGetAuthorsQuery } from "./queries.generated";

export const AuthorsPage: React.FunctionComponent = () => {
  const { loading, error, data } = useGetAuthorsQuery();

  if (loading) {
    return <span>Loading authors...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Could not load authors..." />;
  }

  return (
    <div>
      <h2>Authors</h2>

      <div className={styles.list}>
        {data.authors.map((author) => (
          <AuthorCard key={author.id} author={author} />
        ))}
      </div>
    </div>
  );
};
