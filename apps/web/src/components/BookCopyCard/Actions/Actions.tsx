import React from "react";

import { CurrentUserFragment } from "../../CurrentUserProvider/CurrentUser.fragment.generated";
import { BookCopyCardFragment } from "../BookCopyCard.fragment.generated";
import styles from "./Actions.scss";
import { BorrowButton } from "./BorrowButton";
import { ReturnButton } from "./ReturnButton";

type Props = {
  currentUser: CurrentUserFragment;
  bookCopy: BookCopyCardFragment;
};

export const Actions: React.FunctionComponent<Props> = ({
  currentUser,
  bookCopy
}) => {
  const canBorrow = !bookCopy.borrower && bookCopy.owner.id !== currentUser.id;

  const canReturn =
    bookCopy.borrower && bookCopy.borrower.id === currentUser.id;

  return (
    <div className={styles.container}>
      {canBorrow && <BorrowButton bookCopy={bookCopy} />}
      {canReturn && <ReturnButton bookCopy={bookCopy} />}
    </div>
  );
};
