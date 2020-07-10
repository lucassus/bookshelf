import { ApolloProvider } from "@apollo/client";
import { withKnobs, text } from "@storybook/addon-knobs";
import { graphql } from "msw";
import React from "react";
import { MemoryRouter } from "react-router";

import { client } from "../../client";
import { worker } from "../../mocks/browser";
import { createAuthor, createBook } from "../../testUtils/factories";
import { BookCard } from "./BookCard";

export default {
  title: "BookCard",
  component: BookCard,
  decorators: [withKnobs]
};

worker.use(
  graphql.mutation("UpdateBookFavourite", (req, res, ctx) =>
    res(
      ctx.data({
        updateBookFavourite: {
          __typename: "Book",
          id: 1,
          favourite: true
        }
      })
    )
  )
);

worker.start();

export const Basic = () => {
  const book = createBook({
    id: "1",
    title: text("Title", "Blood of Elves"),
    favourite: false,
    author: createAuthor({
      name: text("Author Name", "Andrzej Sapkowski")
    })
  });

  return (
    <MemoryRouter>
      <ApolloProvider client={client}>
        <BookCard book={book} />
      </ApolloProvider>
    </MemoryRouter>
  );
};
