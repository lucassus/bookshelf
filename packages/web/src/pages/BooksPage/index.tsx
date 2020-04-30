import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert, Pagination } from "@material-ui/lab";
import React, { useCallback, useMemo } from "react";

import { BookCard } from "../../components/BookCard";
import { Book } from "../../types.generated";
import { useGetBooksQuery } from "./queries.generated";

const PER_PAGE = 8;

export const BooksPage: React.FunctionComponent = () => {
  const { loading, data, fetchMore, error } = useGetBooksQuery({
    variables: { limit: PER_PAGE }
  });

  const handlePageChange = useCallback(
    (_, page: number) => {
      const offset = (page - 1) * PER_PAGE;
      return fetchMore({ variables: { offset } });
    },
    [fetchMore]
  );

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.booksCount / PER_PAGE) : 1),
    [data]
  );

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading books...</span>
      </div>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Could not load books...</Alert>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Books
      </Typography>

      <Grid container spacing={3}>
        {data.books.map((book) => (
          <Grid item key={book.id} xs={12} sm={6} md={4}>
            <BookCard book={book as Book} />
          </Grid>
        ))}
      </Grid>

      <Box m={2} display="flex" justifyContent="center">
        <Pagination
          onChange={handlePageChange}
          count={totalPages}
          shape="rounded"
          size="large"
        />
      </Box>
    </Container>
  );
};
