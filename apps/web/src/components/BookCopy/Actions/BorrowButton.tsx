import React from "react";

import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { useBorrowBookCopyMutation } from "./BorrowBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [borrowBookCopy, { loading }] = useBorrowBookCopyMutation();

  const handleClick = () =>
    borrowBookCopy({
      variables: { id: bookCopy.id }
    });

  return (
    <button disabled={loading} onClick={handleClick}>
      borrow
    </button>
  );
};
