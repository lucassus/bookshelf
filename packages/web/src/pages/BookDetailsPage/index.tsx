import React from "react";
import { useParams } from "react-router-dom";

import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetBookQuery } from "./queries.generated";

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

  // TODO: <p/> or something better
  return (
    <div>
      <h2>{data.book.title}</h2>

      {data.book.author && <h3>Written by {data.book.author.name}</h3>}

      <p>{data.book.description}</p>
    </div>
  );
};
