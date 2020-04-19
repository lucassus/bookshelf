import { render, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import {MockedProvider} from "@apollo/client/testing";

import {App, MESSAGE_QUERY} from './App';

test('renders learn react link', async () => {
  const mocks = [
    {
      request: {
        query: MESSAGE_QUERY,
      },
      result: {
        data: {
          message: "Hello Test!"
        },
      }
    }
  ]

  const { getByText } = render(<MockedProvider mocks={mocks}><App /></MockedProvider>);
  expect(getByText("Message is loading...")).toBeInTheDocument();

  await waitForElementToBeRemoved(() => getByText("Message is loading..."));
  expect(getByText("Hello Test!")).toBeInTheDocument();
});
