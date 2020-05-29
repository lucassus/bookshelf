import { Container, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetBookQuery } from "./queries.generated";

export const BookDetailsPage: React.FunctionComponent = () => {
  const params = useParams<{ id: string }>();

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
    <Container>
      <Typography variant="h2">{data.book.title}</Typography>

      {data.book.author && (
        <Typography variant="h3">Written by {data.book.author.name}</Typography>
      )}

      <Typography>{data.book.description}</Typography>
    </Container>
  );
};
