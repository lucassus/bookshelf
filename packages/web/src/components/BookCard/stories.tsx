import { MockedProvider } from "@apollo/client/testing";
import { withKnobs, text } from "@storybook/addon-knobs";
import React from "react";

import { Book } from "../../types.generated";
import { BookCard } from "./index";
import { UpdateBookFavouriteDocument } from "./queries.generated";

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
          favourite: true
        }
      }
    }
  }
];

export const Basic = () => {
  const book: Book = {
    id: 1,
    title: text("Title", "Blood of Elves"),
    favourite: false,
    author: {
      id: 1,
      name: text("Author Name", "Andrzej Sapkowski"),
      photo: {
        url:
          "http://examples.devmastery.pl/assets/images/book-authors/andrzej-sapkowski.jpg"
      },
      books: []
    },
    cover: {
      url:
        "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg"
    }
  };

  // TODO: Use resolvers?
  return (
    <MockedProvider mocks={mocks}>
      <BookCard book={book} />
    </MockedProvider>
  );
};
