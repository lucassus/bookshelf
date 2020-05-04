import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

import { createAuthor, createBook } from "../../testUtils/factories";
import { BookCard } from "./index";
import { UpdateBookFavouriteDocument } from "./queries.generated";

describe("<BookCard />", () => {
  const book = createBook({
    id: 1,
    author: createAuthor({ name: "Andrzej Sapkowski" })
  });

  it("displays author's name", () => {
    const { getByText } = render(
      <MockedProvider>
        <BookCard book={book} />
      </MockedProvider>
    );

    expect(getByText("Written by Andrzej Sapkowski")).toBeInTheDocument();
  });

  it("handles add to favourites", async () => {
    // Given
    let mutationCalled = false;
    const mocks = [
      {
        request: {
          query: UpdateBookFavouriteDocument,
          variables: { id: 1, favourite: true }
        },
        result: () => {
          mutationCalled = true;
          return {};
        }
      }
    ];

    const { getByLabelText } = render(
      <MockedProvider mocks={mocks}>
        <BookCard book={book} />
      </MockedProvider>
    );

    // When
    fireEvent.click(getByLabelText("Add to favourites"));

    // Then
    await waitFor(() => expect(mutationCalled).toBe(true));
  });
});
