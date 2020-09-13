import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthContextProvider } from "./components/AuthContext";
import { GRAPHQL_ENDPOINT } from "./config";
import introspectionResult from "./introspectionResult.generated";

const cache = new InMemoryCache({
  addTypename: true,
  possibleTypes: introspectionResult.possibleTypes
});

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

const errorsLink = onError(({ operation, graphQLErrors }) => {
  const containsUnauthenticatedError = (graphQLErrors || []).some(
    (error) => error.extensions?.code === "UNAUTHENTICATED"
  );

  if (
    operation.operationName !== "GetCurrentUser" &&
    containsUnauthenticatedError
  ) {
    window.location.reload();
  }
});

const client = new ApolloClient({
  cache,
  link: errorsLink.concat(httpLink)
});

export const AppProviders: React.FunctionComponent = ({ children }) => (
  <Router>
    <ApolloProvider client={client}>
      <AuthContextProvider>{children}</AuthContextProvider>
    </ApolloProvider>
  </Router>
);
