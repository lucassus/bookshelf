import React from "react";
import { useParams } from "react-router-dom";

import { BookCopy } from "../../components/BookCopy";
import { ErrorAlert } from "../../components/ErrorAlert";
import { UserCard } from "../../components/UserCard";
import { NotFoundPage } from "../NotFoundPage";
import { useGetUserQuery } from "./GetUser.query.generated";
import styles from "./UserDetailsPage.module.scss";

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

  // TODO: Write e2e test for borrowedBooks
  return (
    <div>
      <UserCard user={user} />
      <span>{user.info}</span>

      <div>
        {user.ownedBookCopies.length > 0 ? (
          <>
            <h3>Owned book copies ({user.ownedBookCopies.length})</h3>

            <div className={styles.bookCopies}>
              {user.ownedBookCopies.map((bookCopy) => (
                <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
              ))}
            </div>
          </>
        ) : (
          <span>User does not have any books.</span>
        )}
      </div>

      <div data-testid="borrowed-book-copies-list">
        {user.__typename === "ProtectedUser" &&
        user.borrowedBookCopies.length > 0 ? (
          <>
            <h3>Borrowed book copies ({user.borrowedBookCopies.length})</h3>

            <div className={styles.bookCopies}>
              {user.borrowedBookCopies.map((bookCopy) => (
                <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
              ))}
            </div>
          </>
        ) : (
          <span>User does not have any borrowed books.</span>
        )}
      </div>
    </div>
  );
};
