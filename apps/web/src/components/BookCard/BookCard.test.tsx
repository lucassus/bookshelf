import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { BookCard } from "./BookCard";
import { BookCardFragment } from "./BookCard.fragment.generated";

describe("<BookCard />", () => {
  const book: BookCardFragment = {
    __typename: "Book",
    id: "1",
    title: "Test book",
    isFavourite: false,
    author: {
      id: "1",
      name: "Andrzej Sapkowski"
    },
    cover: {
      url:
        "http://examples.devmastery.pl/assets/images/book-covers/witcher1.jpg"
    }
  };

  it("displays author's name", () => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <BookCard book={book} />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });

  // TODO: Fix this test
  // it("handles add to favourites", async () => {
  //   // Given
  //   let mutationCalled = false;
  //   const mocks = [
  //     {
  //       request: {
  //         query: UpdateBookFavouriteDocument,
  //         variables: { id: "1", favourite: true }
  //       },
  //       result: () => {
  //         mutationCalled = true;
  //         return {};
  //       }
  //     }
  //   ];
  //
  //   render(
  //     <MemoryRouter>
  //       <MockedProvider mocks={mocks}>
  //         <BookCard book={book} />
  //       </MockedProvider>
  //     </MemoryRouter>
  //   );
  //
  //   // When
  //   fireEvent.click(screen.getByLabelText("Add to favourites"));
  //
  //   // Then
  //   await waitFor(() => expect(mutationCalled).toBe(true));
  // });
});
