import React from "react";

import { formatDateTime } from "../../../utils/formatDateTime";
import { Button } from "../../Button";
import { BookCopyCardFragment } from "../BookCopyCard.fragment.generated";
import { useReturnBookCopyMutation } from "./ReturnBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyCardFragment;
};

export const ReturnButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [returnBookCopy, { loading }] = useReturnBookCopyMutation();

  const handleClick = () => returnBookCopy({ variables: { id: bookCopy.id } });

  return (
    <Button
      disabled={loading}
      onClick={handleClick}
      title={`Borrowed at ${formatDateTime(new Date(bookCopy.borrowedAt))}`}
    >
      return
    </Button>
  );
};
