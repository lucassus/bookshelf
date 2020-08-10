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

const errorsLink = onError(({ networkError }) => {
  console.log({ networkError });
  // if (networkError.statusCode === 401) {
  //   // TODO: Somehow handle logout
  // }
});

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

const client = new ApolloClient({
  cache,
  link: errorsLink.concat(httpLink)
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
