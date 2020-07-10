import { ApolloProvider } from "@apollo/client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { graphql } from "msw";
import React from "react";
import { MemoryRouter } from "react-router";

import { client } from "../../client";
import { server } from "../../mocks/server";
import { createAuthor, createBook } from "../../testUtils/factories";
import { BookCard } from "./BookCard";

describe("<BookCard />", () => {
  const book = createBook({
    id: "1",
    author: createAuthor({ name: "Andrzej Sapkowski" })
  });

  it("displays author's name", () => {
    render(
      <MemoryRouter>
        <ApolloProvider client={client}>
          <BookCard book={book} />
        </ApolloProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });

  it("handles add to favourites", async () => {
    // Given
    let mutationCalled = false;

    server.use(
      graphql.mutation("UpdateBookFavourite", (req, res, ctx) => {
        mutationCalled = true;

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

    render(
      <MemoryRouter>
        <ApolloProvider client={client}>
          <BookCard book={book} />
        </ApolloProvider>
      </MemoryRouter>
    );

    // When
    fireEvent.click(screen.getByLabelText("Add to favourites"));

    // Then
    await waitFor(() => expect(mutationCalled).toBe(true));
  });
});
