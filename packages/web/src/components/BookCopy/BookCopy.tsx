import React from "react";

import { Avatar } from "../Avatar";
import { BookCopyFragment } from "./BookCopy.fragment.generated";

type Props = {
  bookCopy: BookCopyFragment;
};

export const BookCopy: React.FunctionComponent<Props> = ({ bookCopy }) => (
  <div>
    <img src={bookCopy.book.cover.url} alt={bookCopy.book.title} />

    <Avatar name={bookCopy.owner.name} avatar={bookCopy.owner.avatar} />

    {bookCopy.borrower && (
      <Avatar name={bookCopy.borrower.name} avatar={bookCopy.borrower.avatar} />
    )}
  </div>
);
