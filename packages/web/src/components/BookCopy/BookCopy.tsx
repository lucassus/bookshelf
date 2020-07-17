import React from "react";

import { BookCopyFragment } from "./BookCopy.fragment.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BookCopy: React.FunctionComponent<Props> = ({ bookCopy }) => (
  <div>
    <img src={bookCopy.book.cover.url} alt={bookCopy.book.title} />
    {bookCopy.owner.name}
  </div>
);
