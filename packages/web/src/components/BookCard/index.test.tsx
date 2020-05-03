import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";

import { Book } from "../../types.generated";
import { BookCard } from "./index";
import { UpdateBookFavouriteDocument } from "./queries.generated";

describe("<BookCard />", () => {
  it("handles add to favourites", async () => {
    // Given
    const book: Book = {
      id: 1,
      title: "Test book",
      favourite: false,
      cover: {
        url: "https://books.com/cover.png"
      }
    };

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
