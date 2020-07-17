import React from "react";

import { BookCopyFragment } from "./BookCopy.fragment.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const Actions: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const canBorrow = !!bookCopy.borrower;
  const canReturn = !canBorrow;

  const handleBorrow = () => {
    console.log("Borrowing a book copy...");
  };

  const handleReturn = () => {
    console.log("Returning a book copy...");
  };

  return (
    <div>
      {canBorrow && <button onClick={handleBorrow}>borrow</button>}
      {canReturn && <button onClick={handleReturn}>return</button>}
    </div>
  );
};
