import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import React from "react";

import { BookCard } from "../../components/BookCard";
import { useGetBooksQuery } from "./queries.generated";

export const BooksPage: React.FunctionComponent = () => {
  const { data, loading, error } = useGetBooksQuery();

  const handleChangePage = (event, page: number) => {
    console.log({ page });
  };

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading books...</span>
      </div>
    );
  }

  if (error) {
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

      <Pagination
        onChange={handleChangePage}
        count={10}
        shape="rounded"
        size="large"
      />
    </Container>
  );
};
