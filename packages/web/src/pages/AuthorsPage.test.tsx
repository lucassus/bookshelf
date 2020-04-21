import { MockedProvider } from "@apollo/client/testing";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";

import { Author } from "../types";
import { AUTHORS_QUERY, AuthorsPage } from "./AuthorsPage";

describe("<AuthorsPage />", () => {
  it("renders list of authors", async () => {
    // Given
    const mocks = [
      {
        request: {
          query: AUTHORS_QUERY
        },
        result: {
          data: {
            authors: [
              {
                name: "J. K. Rowling",
                photo: {
                  url: "http://example.com/rowling.jpg"
                }
              },
              {
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
        <AuthorsPage />
      </MockedProvider>
    );

    // Then
    expect(getByText("Loading...")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText("Loading..."));

    expect(getByText("J. K. Rowling")).toBeInTheDocument();
    expect(getByText("Andrzej Sapkowski")).toBeInTheDocument();
  });
});
