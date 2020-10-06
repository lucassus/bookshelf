import React from "react";

import { CurrentUserFragment } from "../../CurrentUserProvider/CurrentUser.fragment.generated";
import { BookCopyFragment } from "../BookCopyCard.fragment.generated";
import { BorrowButton } from "./BorrowButton";
import { ReturnButton } from "./ReturnButton";

type Props = {
  currentUser: CurrentUserFragment;
  bookCopy: BookCopyFragment;
};

export const Actions: React.FunctionComponent<Props> = ({
  currentUser,
  bookCopy
}) => {
  const canBorrow = !bookCopy.borrower;
  const canReturn = !canBorrow;

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
