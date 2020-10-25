import React from "react";

import { Button } from "../../Button";
import { BookCopyCardFragment } from "../BookCopyCard.fragment.generated";
import { useBorrowBookCopyMutation } from "./BorrowBookCopy.mutation.generated";

type Props = {
  bookCopy: BookCopyCardFragment;
};

export const BorrowButton: React.FunctionComponent<Props> = ({ bookCopy }) => {
  const [borrowBookCopy, { loading }] = useBorrowBookCopyMutation();

  const handleClick = () => borrowBookCopy({ variables: { id: bookCopy.id } });

  return (
    <Button disabled={loading} onClick={handleClick}>
      borrow
    </Button>
  );
};
