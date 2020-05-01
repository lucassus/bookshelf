import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

import { BookCard } from "../../components/BookCard";
import { Book } from "../../types.generated";
import { useGetAuthorQuery } from "./queries.generated";

export const AuthorPage: React.FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { loading, data, error } = useGetAuthorQuery({
    variables: { id: parseInt(params.id, 10) }
  });

  if (loading) {
    return <span>Loading author...</span>;
  }

  if (error || !data) {
    return <span>Count not load author!</span>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Author {data.author.name}
      </Typography>

      <Grid container spacing={3}>
        {data.author.books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book as Book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
