import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "./App";
import { GRAPHQL_ENDPOINT } from "./config";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false
});

const authLink = setContext((_, { headers }) => {
  const authToken = window.localStorage.getItem("authToken");

  return {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : ""
    }
  };
});

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink)
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
