import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { createAuthor } from "../../testUtils/factories";
import { Author } from "../../types.generated";
import { AuthorsPage } from "./AuthorsPage";
import { GetAuthorsDocument } from "./GetAuthors.query.generated";

export const GetAuthorsDocumentMock: MockedResponse<{
  authors: Author[];
}> = {
  request: {
    query: GetAuthorsDocument
  },
  result: {
    data: {
      authors: [
        {
          __typename: "Author",
          ...createAuthor({ id: "1", name: "J. K. Rowling" })
        },
        {
          __typename: "Author",
          ...createAuthor({ id: "2", name: "Andrzej Sapkowski" })
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
        <MockedProvider mocks={mocks}>
          <MemoryRouter>{children}</MemoryRouter>
        </MockedProvider>
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
