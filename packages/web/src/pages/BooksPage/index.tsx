import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import React, { useCallback } from "react";

import { BookCard } from "../../components/BookCard";
import { useGetBooksQuery } from "./queries.generated";

const LIMIT = 9;

// TODO: Keep the current page in the url query params
export const BooksPage: React.FunctionComponent = () => {
  const { loading, data, fetchMore, error } = useGetBooksQuery({
    variables: { limit: LIMIT }
  });

  const handlePageChange = useCallback(
    (_, page: number) => {
      const offset = (page - 1) * LIMIT;
      return fetchMore({ variables: { offset } });
    },
    [fetchMore]
  );

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading books...</span>
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">Could not load books...</Alert>;
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

      <Box m={2} display="flex" justifyContent="center">
        <Pagination
          onChange={handlePageChange}
          count={Math.ceil(data.books.total / LIMIT)}
          shape="rounded"
          size="large"
        />
      </Box>
    </Container>
  );
};
