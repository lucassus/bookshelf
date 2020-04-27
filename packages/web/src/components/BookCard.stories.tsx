import { withKnobs, text } from "@storybook/addon-knobs";
import React from "react";

import { Book } from "../types.generated";
import { BookCard } from "./BookCard";

export default {
  title: "BookCard",
  component: BookCard,
  decorators: [withKnobs]
};

export const simple = () => {
  const book: Partial<Book> = {
    id: 1,
    title: text("Title", "Blood of Elves"),
    author: {
      id: 1,
      name: "Andrzej Sapkowski",
      photo: {
        url:
          "http://examples.devmastery.pl/assets/images/book-authors/andrzej-sapkowski.jpg"
      }
    },
    cover: {
      url:
        "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg"
    }
  };

  return <BookCard book={book} />;
};
