import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "typeface-roboto";

import { App } from "./App";
import { AuthContextProvider } from "./components/AuthContext";
import { GRAPHQL_ENDPOINT } from "./config";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false
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

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
