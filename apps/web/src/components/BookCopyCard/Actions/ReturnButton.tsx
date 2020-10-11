import React from "react";

import { BookCopyCardFragment } from "../BookCopyCard.fragment.generated";
import { useReturnBookCopyMutation } from "./ReturnBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyCardFragment;
};

const formatDateTime = (dateString: string) =>
  new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(dateString));

export const ReturnButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [returnBookCopy, { loading }] = useReturnBookCopyMutation();

  const handleClick = () => returnBookCopy({ variables: { id: bookCopy.id } });

  return (
    <button
      disabled={loading}
      onClick={handleClick}
      title={`Borrowed at ${formatDateTime(bookCopy.borrowedAt)}`}
    >
      return
    </button>
  );
};
