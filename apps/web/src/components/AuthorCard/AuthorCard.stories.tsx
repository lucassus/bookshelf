import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { MemoryRouter } from "react-router";

import { Author } from "../../types.generated";
import { AuthorCard } from "./AuthorCard";

export default {
  title: "AuthorCard",
  component: AuthorCard,
  decorators: [withKnobs]
};

export const Basic = () => {
  const author: Author = {
    id: "1",
    name: text("Author Name", "J. K. Rowling"),
    bio: "Lorem ipsum",
    photo: {
      path: "/book-authors/j-k-rowling.jpg",
      url:
        "http://examples.devmastery.pl/assets/images/book-authors/j-k-rowling.jpg"
    },
    createdAt: "2020-07-19T14:00:00.00Z",
    updatedAt: "2020-07-19T14:00:00.00Z",
    books: []
  };

  return (
    <MemoryRouter>
      <AuthorCard author={author} />
    </MemoryRouter>
  );
};
