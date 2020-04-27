import React from "react";

import { BookCard } from "../src/components/BookCard";
import { Book } from "../src/types.generated";

// TODO: Colocate stories
export default {
  title: "BookCard",
  component: BookCard
};

const book: Partial<Book> = {
  id: 1,
  title: "Blood of Elves",
  author: {
    id: 1,
    name: "Andrzej Sapkowski",
    photo: {
      url:
        "http://examples.devmastery.pl/assets/images/book-authors/andrzej-sapkowski.jpg"
    }
  },
  cover: {
    url: "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg"
  }
};

export const simple = () => <BookCard book={book} />;
