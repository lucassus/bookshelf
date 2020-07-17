import React from "react";

import { BookCopyFragment } from "./BookCopy.fragment.generated";
import { BorrowButton } from "./BorrowButton";
import { ReturnButton } from "./ReturnButton";

type Props = {
  bookCopy: BookCopyFragment;
};

export const Actions: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const canBorrow = !bookCopy.borrower;
  const canReturn = !canBorrow;

  return (
    <div>
      {canBorrow && <BorrowButton bookCopy={bookCopy} />}
      {canReturn && <ReturnButton bookCopy={bookCopy} />}
    </div>
  );
};
