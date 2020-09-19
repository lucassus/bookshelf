import React from "react";

import { BookCopyFragment } from "../BookCopy.fragment.generated";
import { useReturnBookCopyMutation } from "./ReturnBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const ReturnButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [returnBookCopy, { loading }] = useReturnBookCopyMutation();

  const handleClick = () => returnBookCopy({ variables: { id: bookCopy.id } });

  return (
    <button disabled={loading} onClick={handleClick}>
      return
    </button>
  );
};
