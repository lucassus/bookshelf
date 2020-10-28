import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import { CloudinaryContext } from "cloudinary-react";
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
    averageRating: 7.5,
    reviewsCount: 2,
    author: {
      id: "1",
      name: "Andrzej Sapkowski"
    },
    cover: {
      path: "/bookshelf/covers/witcher1.jpg"
    }
  };

  it("displays author's name", () => {
    render(
      <MemoryRouter>
        <CloudinaryContext cloudName="lucassus">
          <MockedProvider>
            <BookCard book={book} />
          </MockedProvider>
        </CloudinaryContext>
      </MemoryRouter>
    );

    expect(screen.getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });
});
