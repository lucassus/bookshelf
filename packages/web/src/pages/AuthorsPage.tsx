import { gql, useQuery } from "@apollo/client";
import React from "react";

import { Author } from "../components/Author";
import { AuthorInterface } from "../types";

const ALL_AUTHORS_QUERY = gql`
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
    authors: AuthorInterface[];
  }>(ALL_AUTHORS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Could not load authors...</p>;
  }

  return (
    <div>
      {data.authors.map((author: any) => (
        <Author key={author.name} author={author} />
      ))}
    </div>
  );
};
