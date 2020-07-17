import React from "react";
import { useParams } from "react-router-dom";

import { BookCopy } from "../../components/BookCopy";
import { ErrorAlert } from "../../components/ErrorAlert";
import { UserCard } from "../../components/UserCard";
import { useGetUserQuery } from "./GetUser.query.generated";

export const UserDetailsPage: React.FunctionComponent = () => {
  const params = useParams();

  const { loading, data, error } = useGetUserQuery({
    variables: { id: params.id }
  });

  if (loading) {
    return <span>Loading user...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Count not load user!" />;
  }

  return (
    <div>
      <UserCard user={data.user} />
      <span>{data.user.info}</span>

      {data.user.ownedBookCopies.length > 0 && (
        <div>
          <h3>Owned book copies</h3>
          {data.user.ownedBookCopies.map((bookCopy) => (
            <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
          ))}
        </div>
      )}

      {data.user.borrowedBookCopies.length > 0 && (
        <div>
          <h3>Borrowed book copies</h3>
          {data.user.borrowedBookCopies.map((bookCopy) => (
            <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
          ))}
        </div>
      )}
    </div>
  );
};
