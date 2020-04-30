import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

import { AuthorCard } from "../../components/AuthorCard";
import { Author } from "../../types.generated";
import { useGetAuthorsQuery } from "./queries.generated";

export const AuthorsPage: React.FunctionComponent = () => {
  const { loading, error, data } = useGetAuthorsQuery();

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading authors...</span>
      </div>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Could not load authors...</Alert>;
  }

  // TODO: Find a solution for ugly `author as Author` casting
  return (
    <Container>
      <Typography variant="h4" component="h2">
        Authors
      </Typography>

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={3}
      >
        {data.authors.map((author) => (
          <Grid item key={author.id}>
            <AuthorCard author={author as Author} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
