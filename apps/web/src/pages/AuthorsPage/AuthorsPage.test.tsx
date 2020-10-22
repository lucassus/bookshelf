import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { CloudinaryContext } from "cloudinary-react";
import React from "react";
import { MemoryRouter } from "react-router";

import { AuthorCardFragment } from "../../components/AuthorCard/AuthorCard.fragment.generated";
import { AuthorsPage } from "./AuthorsPage";
import { GetAuthorsDocument } from "./GetAuthors.query.generated";

export const GetAuthorsDocumentMock: MockedResponse<{
  authors: AuthorCardFragment[];
}> = {
  request: {
    query: GetAuthorsDocument
  },
  result: {
    data: {
      authors: [
        {
          __typename: "Author",
          id: "1",
          name: "J. K. Rowling",
          photo: {
            path: "/bookshelf/book-authors/j-k-rowling.jpg"
          }
        },
        {
          __typename: "Author",
          id: "2",
          name: "Andrzej Sapkowski",
          photo: {
            path: "/bookshelf/book-authors/sapkowski.jpg"
          }
        }
      ]
    }
  }
};

export const GetAuthorsDocumentErrorMock: MockedResponse = {
  request: {
    query: GetAuthorsDocument
  },
  error: new Error()
};

describe("<AuthorsPage />", () => {
  const renderComponent = ({ mocks }: { mocks: MockedResponse[] }) =>
    render(<AuthorsPage />, {
      wrapper: ({ children }) => (
        <CloudinaryContext cloudName="lucassus">
          <MockedProvider mocks={mocks}>
            <MemoryRouter>{children}</MemoryRouter>
          </MockedProvider>
        </CloudinaryContext>
      )
    });

  it("renders list of authors", async () => {
    // When
    const { getByText } = renderComponent({ mocks: [GetAuthorsDocumentMock] });

    // Then
    expect(getByText("Loading authors...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText("Loading authors..."));

    expect(getByText("J. K. Rowling")).toBeInTheDocument();
    expect(getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });

  it("renders error alert when request fails", async () => {
    // When
    const { getByText } = renderComponent({
      mocks: [GetAuthorsDocumentErrorMock]
    });

    // Then
    await waitForElementToBeRemoved(() => getByText("Loading authors..."));
    expect(getByText("Could not load authors...")).toBeInTheDocument();
  });
});
