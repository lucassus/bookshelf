import { useQuery } from "@apollo/client";
import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

import { BookCard } from "../../components/BookCard";
import { GetBooksQuery } from "../../generated/graphql";
import { GetBooks } from "./query";

export const BooksPage: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery<GetBooksQuery>(GetBooks);

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading users...</span>
      </div>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Could not load users...</Alert>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Books
      </Typography>

      <Grid container spacing={3}>
        {data.books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
