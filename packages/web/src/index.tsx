import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { GRAPHQL_ENDPOINT } from "./config";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT }),
  queryDeduplication: false
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
