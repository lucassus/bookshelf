import { gql, useQuery } from "@apollo/client";
import { Typography, Container, Grid } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

import { BookCard } from "../components/BookCard";
import { Author } from "../types";

const AUTHOR_QUERY = gql`
  query($id: Int!) {
    author(id: $id) {
      name
      books {
        id
        title
        cover {
          url
        }
      }
    }
  }
`;

export const AuthorPage: React.FunctionComponent = () => {
  const params = useParams();

  const { loading, error, data } = useQuery<{ author: Author }>(AUTHOR_QUERY, {
    variables: { id: parseInt(params.id, 10) }
  });

  if (loading || error) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Author {data.author.name} books
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
