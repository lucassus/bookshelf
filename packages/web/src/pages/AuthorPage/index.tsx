import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

import { BookCard } from "../../components/BookCard";
import { useGetAuthorQuery } from "./queries.generated";

export const AuthorPage: React.FunctionComponent = () => {
  const params = useParams<{ id: string }>();

  const { error, data } = useGetAuthorQuery({
    variables: { id: parseInt(params.id, 10) }
  });

  // TODO: Add a generic 404 page
  if (error || !data || !data.author) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Author {data.author.name}
      </Typography>

      <Grid container spacing={3}>
        {data.author.books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
