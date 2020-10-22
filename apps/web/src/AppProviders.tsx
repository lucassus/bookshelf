import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { CloudinaryContext } from "cloudinary-react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { CurrentUserProvider } from "./components/CurrentUserProvider";
import { GRAPHQL_ENDPOINT } from "./config";
import introspectionResult from "./introspectionResult.generated";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: true,
    possibleTypes: introspectionResult.possibleTypes
  }),
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT })
});

export const AppProviders: React.FunctionComponent = ({ children }) => (
  <Router>
    <CloudinaryContext cloudName="lucassus">
      <ApolloProvider client={client}>
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </ApolloProvider>
    </CloudinaryContext>
  </Router>
);
