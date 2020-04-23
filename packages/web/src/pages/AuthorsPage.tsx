import { gql, useQuery } from "@apollo/client";
import { Alert } from "@material-ui/lab";
import { Box, CircularProgress } from "@material-ui/core";
import React from "react";

import { AuthorCard } from "../components/AuthorCard";
import { Author } from "../types";

export const AUTHORS_QUERY = gql`
  query {
    authors {
      name
      photo {
        url
      }
    }
  }
`;

export const AuthorsPage: React.FunctionComponent = () => {
  const { loading, error, data } = useQuery<{
    authors: Author[];
  }>(AUTHORS_QUERY);

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

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
      {data.authors.map((author: any) => (
        <Box key={author.name} m={1}>
          <AuthorCard author={author} />
        </Box>
      ))}
    </Box>
  );
};
