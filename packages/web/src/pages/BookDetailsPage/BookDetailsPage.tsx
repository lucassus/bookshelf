import React from "react";
import { useParams, Link } from "react-router-dom";

import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetBookQuery } from "./GetBook.generated";

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

      {data.book.author && (
        <h3>
          Written by{" "}
          <Link to={`/authors/${data.book.author.id}`}>
            {data.book.author.name}
          </Link>
        </h3>
      )}

      <p>{data.book.description}</p>
    </div>
  );
};
