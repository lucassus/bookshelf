import { gql, useQuery } from "@apollo/client";
import React from "react";

import { AuthorCard } from "../components/AuthorCard";
import { Author } from "../types";
import { Box } from "@material-ui/core";

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
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Could not load authors...</p>;
  }

  return (
    <Box display="flex" flexDirection="row">
      {data.authors.map((author: any) => (
        <AuthorCard key={author.name} author={author} />
      ))}
    </Box>
  );
};
