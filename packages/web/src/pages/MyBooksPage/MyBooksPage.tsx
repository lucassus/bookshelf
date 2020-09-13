import React from "react";

import { CurrentUserFragment } from "../../components/AuthContext/CurrentUser.fragment.generated";
import { BookCopy } from "../../components/BookCopy";
import styles from "../UserDetailsPage/UserDetailsPage.module.scss";
import { useGetMyBooksQuery } from "./GetMyBooks.query.generated";

type Props = {
  currentUser: CurrentUserFragment;
};

export const MyBooksPage: React.FunctionComponent<Props> = () => {
  const { loading, data } = useGetMyBooksQuery();

  if (loading || !data) {
    return <span>Loading...</span>;
  }

  const { currentUser: user } = data;

  // TODO: Find a better solution
  if (!user) {
    return null;
  }

  // TODO: Borrow a book should refresh the borrowedBookCopies list
  // TODO: Return the borrowed book should remove it from the list
  return (
    <div>
      {user.ownedBookCopies.length > 0 && (
        <>
          <h3>Owned book copies</h3>

          <div className={styles.bookCopies}>
            {user.ownedBookCopies.map((bookCopy) => (
              <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
            ))}
          </div>
        </>
      )}

      {user.borrowedBookCopies.length > 0 && (
        <>
          <h3>Borrowed book copies</h3>

          <div className={styles.bookCopies}>
            {user.borrowedBookCopies.map((bookCopy) => (
              <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
