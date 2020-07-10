import { ApolloProvider } from "@apollo/client";
import { addDecorator } from "@storybook/client-api";
import React from "react";

import { client } from "../src/client";

// TODO: Add memory router
// TODO: Setup msw
addDecorator((storyFn) => {
  return <ApolloProvider client={client}>{storyFn()}</ApolloProvider>;
});
