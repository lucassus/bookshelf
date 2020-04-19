import { MockedProvider } from "@apollo/client/testing";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";

import { App, MESSAGE_QUERY } from "./App";

test("renders the message", async () => {
  // Given
  const mocks = [
    {
      request: {
        query: MESSAGE_QUERY
      },
      result: {
        data: {
          message: "Hello Test!"
        }
      }
    }
  ];

  // When
  const { getByText } = render(
    <MockedProvider mocks={mocks}>
      <App />
    </MockedProvider>
  );

  // Then
  expect(getByText("Message is loading...")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => getByText("Message is loading..."));
  expect(getByText("Hello Test!")).toBeInTheDocument();
});
