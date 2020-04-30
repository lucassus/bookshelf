import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { MemoryRouter } from "react-router";

import { Author } from "../types.generated";
import { AuthorCard } from "./AuthorCard";

export default {
  title: "AuthorCard",
  component: AuthorCard,
  decorators: [withKnobs]
};

export const Basic = () => {
  const author: Author = {
    id: 1,
    name: text("Author Name", "J. K. Rowling"),
    photo: {
      url:
        "http://examples.devmastery.pl/assets/images/book-authors/j-k-rowling.jpg"
    },
    books: []
  };

  return (
    <MemoryRouter>
      <AuthorCard author={author} />
    </MemoryRouter>
  );
};
