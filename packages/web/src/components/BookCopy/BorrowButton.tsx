import React from "react";

import { BookCopyFragment } from "./BookCopy.fragment.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const handleClick = () => {
    console.log("Borrowing a book copy...");
  };

  return <button onClick={handleClick}>borrow</button>;
};
