import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { CurrentUserProvider } from "./components/CurrentUserProvider";
import { GRAPHQL_ENDPOINT } from "./config";
import introspectionResult from "./introspectionResult.generated";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: true,
    possibleTypes: introspectionResult.possibleTypes,
    typePolicies: {
      ProtectedUser: {
        keyFields: ["email"]
      }
    }
  }),
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT })
});

export const AppProviders: React.FunctionComponent = ({ children }) => (
  <Router>
    <ApolloProvider client={client}>
      <CurrentUserProvider>{children}</CurrentUserProvider>
    </ApolloProvider>
  </Router>
);
