import React from "react";

import { CurrentUserFragment } from "../../CurrentUserProvider/CurrentUser.fragment.generated";
import { BookCopyCardFragment } from "../BookCopyCard.fragment.generated";
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
    <div>
      {canBorrow && (
        <BorrowButton currentUser={currentUser} bookCopy={bookCopy} />
      )}
      {canReturn && (
        <ReturnButton currentUser={currentUser} bookCopy={bookCopy} />
      )}
    </div>
  );
};
