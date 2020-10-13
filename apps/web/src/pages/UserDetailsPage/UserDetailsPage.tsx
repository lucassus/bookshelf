import React from "react";
import { useParams } from "react-router-dom";

import { BookCopies } from "../../components/BookCopies";
import { ErrorAlert } from "../../components/ErrorAlert";
import { UserCard } from "../../components/UserCard";
import { NotFoundPage } from "../NotFoundPage";
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
    return <ErrorAlert message="Count not load a user!" />;
  }

  const { user } = data;

  if (user.__typename === "ResourceNotFoundError") {
    return <NotFoundPage message={user.message} />;
  }

  return (
    <div>
      <UserCard user={user} />
      <span>{user.info}</span>

      <div data-testid="owned-book-copies-list">
        {user.ownedBookCopies.length > 0 ? (
          <>
            <h3>Owned book copies ({user.ownedBookCopies.length})</h3>
            <BookCopies bookCopies={user.ownedBookCopies} />
          </>
        ) : (
          <span>User does not have any books.</span>
        )}
      </div>

      {user.__typename === "ProtectedUser" && (
        <div data-testid="borrowed-book-copies-list">
          {user.borrowedBookCopies.length > 0 ? (
            <>
              <h3>Borrowed book copies ({user.borrowedBookCopies.length})</h3>
              <BookCopies bookCopies={user.borrowedBookCopies} />
            </>
          ) : (
            <span>User does not have any borrowed books.</span>
          )}
        </div>
      )}
    </div>
  );
};
