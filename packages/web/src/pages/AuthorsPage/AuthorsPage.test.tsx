import {
  render,
  screen,
  waitForElementToBeRemoved
} from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { ApolloMockedProvider } from "../../testUtils/ApolloMockedProvider";
import { AuthorsPage } from "./AuthorsPage";

describe("<AuthorsPage />", () => {
  const renderComponent = () =>
    render(
      <ApolloMockedProvider
        customResolvers={{
          Query: () => ({
            authors: () => [
              { name: "J. K. Rowling" },
              { name: "Andrzej Sapkowski" }
            ]
          })
        }}
      >
        <MemoryRouter>
          <AuthorsPage />
        </MemoryRouter>
      </ApolloMockedProvider>
    );

  it("renders list of authors", async () => {
    // When
    renderComponent();

    // Then
    expect(screen.getByText("Loading authors...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() =>
      screen.getByText("Loading authors...")
    );

    screen.debug();

    expect(screen.getByText("J. K. Rowling")).toBeInTheDocument();
    expect(screen.getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });

  // xit("renders error alert when request fails", async () => {
  //   // When
  //   renderComponent({
  //     mocks: [GetAuthorsDocumentErrorMock]
  //   });
  //
  //   // Then
  //   await waitForElementToBeRemoved(() => screen.getByText("Loading authors..."));
  //   expect(screen.getByText("Could not load authors...")).toBeInTheDocument();
  // });
});
