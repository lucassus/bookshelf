import React from "react";

import { BookCopy } from "../../components/BookCopy";
import { useGetOwnedBookCopiesQuery } from "./GetOwnedBookCopies.query.generated";
import styles from "./MyBooksPage.module.scss";

export const MyBooksPage: React.FunctionComponent = () => {
  const {
    data,
    loading: loadingOwnedBookCopies
  } = useGetOwnedBookCopiesQuery();

  return (
    <div>
      {loadingOwnedBookCopies ? (
        <span>Loading owned book copies</span>
      ) : (
        data && (
          <div>
            <h2>
              Owned book copies ({data.currentUser?.ownedBookCopies.length})
            </h2>

            <div className={styles.bookCopies}>
              {data.currentUser?.ownedBookCopies.map((bookCopy) => (
                <BookCopy key={bookCopy.id} bookCopy={bookCopy} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
