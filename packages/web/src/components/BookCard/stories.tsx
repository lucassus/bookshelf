import { withKnobs, text } from "@storybook/addon-knobs";
import { graphql } from "msw";
import React from "react";
import { MemoryRouter } from "react-router";

import { worker } from "../../mocks/browser";
import { useGetBookQuery } from "../../pages/BookDetailsPage/GetBook.query.generated";
import { createAuthor, createBook } from "../../testUtils/factories";
import { BookCard } from "./BookCard";

export default {
  title: "BookCard",
  component: BookCard,
  decorators: [withKnobs]
};

worker.use(
  graphql.query("GetBook", (req, res, ctx) => {
    const { id } = req.variables;

    return res(
      ctx.data([
        {
          book: {
            __typename: "Book",
            ...createBook({
              id,
              title: text("Title", "Blood of Elves"),
              favourite: false,
              author: createAuthor({
                name: text("Author Name", "Andrzej Sapkowski")
              })
            })
          }
        }
      ])
    );
  }),

  graphql.mutation("UpdateBookFavourite", (req, res, ctx) => {
    const { id, favourite } = req.variables;

    return res(
      ctx.data({
        updateBookFavourite: {
          __typename: "Book",
          id,
          favourite
        }
      })
    );
  })
);

worker.start();

export const Basic: React.FunctionComponent = () => {
  const { data } = useGetBookQuery({ variables: { id: "1" } });

  return <MemoryRouter>{data && <BookCard book={data.book} />}</MemoryRouter>;
};
