import { MockedProvider } from "@apollo/client/testing";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";

import { Author } from "../../generated/graphql";
import { AuthorsPage } from "./index";
import { GetAuthors } from "./query";

describe("<AuthorsPage />", () => {
  it("renders list of authors", async () => {
    // Given
    const mocks = [
      {
        request: {
          query: GetAuthors
        },
        result: {
          data: {
            authors: [
              {
                id: 1,
                name: "J. K. Rowling",
                photo: {
                  url: "http://example.com/rowling.jpg"
                }
              },
              {
                id: 2,
                name: "Andrzej Sapkowski",
                photo: {
                  url: "http://example.com/rowling.jpg"
                }
              }
            ] as Author[]
          }
        }
      }
    ];

    // When
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <AuthorsPage />
        </MemoryRouter>
      </MockedProvider>
    );

    // Then
    expect(getByText("Loading authors...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText("Loading authors..."));

    expect(getByText("J. K. Rowling")).toBeInTheDocument();
    expect(getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });

  it("renders error alert when request fails", async () => {
    // Given
    const mocks = [
      {
        request: {
          query: GetAuthors
        },
        error: new Error()
      }
    ];

    // When
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <AuthorsPage />
      </MockedProvider>
    );

    // Then
    await waitForElementToBeRemoved(() => getByText("Loading authors..."));
    expect(getByText("Could not load authors...")).toBeInTheDocument();
  });
});
