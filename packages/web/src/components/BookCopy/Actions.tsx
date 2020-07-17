import React from "react";

import { BookCopyFragment } from "./BookCopy.fragment.generated";
import { BorrowButton } from "./BorrowButton";

type Props = {
  bookCopy: BookCopyFragment;
};

export const Actions: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const canBorrow = !bookCopy.borrower;
  const canReturn = !canBorrow;

  const handleReturn = () => {
    console.log("Returning a book copy...");
  };

  return (
    <div>
      {canBorrow && <BorrowButton bookCopy={bookCopy} />}
      {canReturn && <button onClick={handleReturn}>return</button>}
    </div>
  );
};
