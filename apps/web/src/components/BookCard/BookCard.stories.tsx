import { MockedProvider } from "@apollo/client/testing";
import { withKnobs, text } from "@storybook/addon-knobs";
import React from "react";
import { MemoryRouter } from "react-router";

import { AddBookToFavouritesDocument } from "../FavouriteBookButton/AddBookToFavourites.generated";
import { BookCard } from "./BookCard";
import { BookCardFragment } from "./BookCard.fragment.generated";

export default {
  title: "BookCard",
  component: BookCard,
  decorators: [withKnobs]
};

// TODO: It could handle only one response
const mocks = [
  {
    request: {
      query: AddBookToFavouritesDocument,
      variables: { id: 1 }
    },
    result: {
      data: {
        updateBookFavourite: {
          __typename: "Book",
          id: 1,
          isFavourite: true
        }
      }
    }
  }
];

export const Basic = () => {
  const book: BookCardFragment = {
    __typename: "Book",
    id: "1",
    title: text("Title", "Blood of Elves"),
    isFavourite: false,
    author: {
      id: "1",
      name: text("Author Name", "Andrzej Sapkowski")
    },
    cover: {
      path: "/bookshelf/covers/witcher1.jpg"
    }
  };

  return (
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <BookCard book={book} />
      </MockedProvider>
    </MemoryRouter>
  );
};
