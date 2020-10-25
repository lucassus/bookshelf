import { Image, Transformation } from "cloudinary-react";
import React from "react";
import { Link } from "react-router-dom";

import { Card } from "../Card";
import { useCurrentUser } from "../CurrentUserProvider";
import { Actions } from "./Actions";
import { BookCopyCardFragment } from "./BookCopyCard.fragment.generated";
import styles from "./BookCopyCard.scss";
import { useBookCopyUpdatedSubscription } from "./BookCopyUpdated.subscription.generated";
import { BookCopyUser } from "./BookCopyUser";

type Props = {
  bookCopy: BookCopyCardFragment;
};

export const BookCopyCard: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const currentUser = useCurrentUser();

  useBookCopyUpdatedSubscription({
    variables: { id: bookCopy.id }
  });

  return (
    <Card
      className={styles.container}
      data-testid={`book-copy-card:${bookCopy.book.title}`}
    >
      <div className={styles.bookCoverWithAvatars}>
        <Link to={`/books/${bookCopy.book.id}`}>
          <Image publicId={bookCopy.book.cover.path} alt="Book cover">
            <Transformation width={130} height={200} crop="scale" />
          </Image>
        </Link>

        <div className={styles.ownerAvatar} data-testid="book-copy-card-owner">
          <BookCopyUser user={bookCopy.owner} />
        </div>

        {bookCopy.borrower && (
          <div
            className={styles.borrowerAvatar}
            data-testid="book-copy-card-borrower"
          >
            <BookCopyUser user={bookCopy.borrower} />
          </div>
        )}
      </div>

      {currentUser && <Actions currentUser={currentUser} bookCopy={bookCopy} />}
    </Card>
  );
};
