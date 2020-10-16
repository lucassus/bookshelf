import { MockedProvider } from "@apollo/client/testing";
import { withKnobs, text } from "@storybook/addon-knobs";
import React from "react";
import { MemoryRouter } from "react-router";

import { createAuthor, createBook } from "../../testUtils/factories";
import { BookCard } from "./BookCard";
import { UpdateBookFavouriteDocument } from "./UpdateBookFavourite.mutation.generated";

export default {
  title: "BookCard",
  component: BookCard,
  decorators: [withKnobs]
};

// TODO: It could handle only one response
const mocks = [
  {
    request: {
      query: UpdateBookFavouriteDocument,
      variables: { id: 1, favourite: true }
    },
    result: {
      data: {
        updateBookFavourite: {
          id: 1,
          isFavourite: true
        }
      }
    }
  }
];

export const Basic = () => {
  const book = createBook({
    id: "1",
    title: text("Title", "Blood of Elves"),
    isFavourite: false,
    author: createAuthor({
      name: text("Author Name", "Andrzej Sapkowski")
    })
  });

  return (
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <BookCard book={book} />
      </MockedProvider>
    </MemoryRouter>
  );
};
