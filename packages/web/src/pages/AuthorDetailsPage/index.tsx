import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

import { BookCard } from "../../components/BookCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetAuthorQuery } from "./queries.generated";

export const AuthorDetailsPage: React.FunctionComponent = () => {
  const params = useParams<{ id: string }>();

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
    <Container>
      <Typography variant="h4" component="h2">
        Author {data.author.name}
      </Typography>

      <Grid container spacing={3}>
        {data.author.books!.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
