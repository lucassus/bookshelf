import { gql, useQuery } from "@apollo/client";
import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

import { BookCard } from "../components/BookCard";
import { Book } from "../types";

const BOOKS_QUERY = gql`
  query {
    books {
      title
      cover {
        url
      }
      author {
        name
      }
    }
  }
`;

export const BooksPage: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery<{
    books: Book[];
  }>(BOOKS_QUERY);

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

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={3}
      >
        {data.books.map((book) => (
          <Grid item key={book.title}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
