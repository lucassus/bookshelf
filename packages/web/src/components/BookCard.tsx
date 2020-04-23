import React from "react";

import { Book } from "../types";

type Props = {
  book: Book;
};

export const BookCard: React.FunctionComponent<Props> = ({ book }) => {
  return <span>{book.title}</span>;
};
