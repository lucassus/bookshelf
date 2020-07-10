import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { server } from "../../mocks/server";
import { AuthorsPage } from "./AuthorsPage";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const client = new ApolloClient({
  cache: new InMemoryCache()
});

describe("<AuthorsPage />", () => {
  const renderComponent = () =>
    render(<AuthorsPage />, {
      wrapper: ({ children }) => (
        <ApolloProvider client={client}>
          <MemoryRouter>{children}</MemoryRouter>
        </ApolloProvider>
      )
    });

  it("renders list of authors", async () => {
    // When
    const { getByText } = renderComponent();

    // Then
    expect(getByText("Loading authors...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText("Loading authors..."));

    expect(getByText("J. K. Rowling")).toBeInTheDocument();
    expect(getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });

  xit("renders error alert when request fails", async () => {
    // When
    const { getByText } = renderComponent();

    // Then
    await waitForElementToBeRemoved(() => getByText("Loading authors..."));
    expect(getByText("Could not load authors...")).toBeInTheDocument();
  });
});
