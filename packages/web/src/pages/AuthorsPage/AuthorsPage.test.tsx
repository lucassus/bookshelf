import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { AuthorsPage } from "./AuthorsPage";
import {
  GetAuthorsDocumentMock,
  GetAuthorsDocumentErrorMock
} from "./queries.mock";

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
