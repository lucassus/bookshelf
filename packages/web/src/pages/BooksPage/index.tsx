import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import React, { useState } from "react";

import { BookCard } from "../../components/BookCard";
import { useGetBooksQuery } from "./queries.generated";

const LIMIT = 9;

// TODO: Keep the current page in the url query params
export const BooksPage: React.FunctionComponent = () => {
  const [page, setPage] = useState(1);

  const { data, loading, error } = useGetBooksQuery({
    variables: { limit: LIMIT, offset: (page - 1) * LIMIT }
  });

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
        {data.books.rows.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        onChange={(_, newPage) => setPage(newPage)}
        page={page}
        count={Math.ceil(data.books.total / LIMIT)}
        shape="rounded"
        size="large"
      />
    </Container>
  );
};
