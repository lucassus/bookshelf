import React from "react";
import { useParams } from "react-router-dom";

import { BookCard } from "../../components/BookCard/BookCard";
import { ErrorAlert } from "../../components/ErrorAlert";
import { useGetAuthorQuery } from "./queries.generated";

export const AuthorDetailsPage: React.FunctionComponent = () => {
  const params = useParams();

  const { loading, data, error } = useGetAuthorQuery({
    variables: { id: params.id }
  });

  if (loading) {
    return <span>Loading author...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Count not load author!" />;
  }

  return (
    <div>
      <h4>Author {data.author.name}</h4>

      {data.author.books &&
        data.author.books.map((book) => <BookCard key={book.id} book={book} />)}
    </div>
  );
};
