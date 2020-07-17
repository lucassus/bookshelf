import React from "react";

import { BookCopyFragment } from "./BookCopy.fragment.generated";
import { useBorrowBookCopyMutation } from "./BorrowBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [borrowBookCopy] = useBorrowBookCopyMutation({
    variables: { id: bookCopy.id }
  });

  const handleClick = () => borrowBookCopy();

  return <button onClick={handleClick}>borrow</button>;
};
