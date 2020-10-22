import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { MemoryRouter } from "react-router";

import { AuthorCard } from "./AuthorCard";
import { AuthorCardFragment } from "./AuthorCard.fragment.generated";

export default {
  title: "AuthorCard",
  component: AuthorCard,
  decorators: [withKnobs]
};

export const Basic = () => {
  const author: AuthorCardFragment = {
    id: "1",
    name: text("Author Name", "J. K. Rowling"),
    photo: {
      path: "/bookshelf/authors/JK%20Rowling.jpg"
    }
  };

  return (
    <MemoryRouter>
      <AuthorCard author={author} />
    </MemoryRouter>
  );
};
