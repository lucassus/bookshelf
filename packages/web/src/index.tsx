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
import { LogoutDocument } from "./components/AppTopBar/Logout.mutation.generated";
import { AuthContextProvider } from "./components/AuthContext";
import { GRAPHQL_ENDPOINT } from "./config";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false
});

const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

const errorsLink = onError(({ graphQLErrors }) => {
  // TODO: Also handle `networkError`
  console.log({ graphQLErrors });

  const isUnauthenticated = (graphQLErrors || []).some(
    (error) => error.extensions?.code === "UNAUTHENTICATED"
  );

  // TODO: Loop with currentUser query
  if (isUnauthenticated) {
    // client.mutate({ mutation: LogoutDocument }).then(() => {
    //   // window.location.reload();
    // });
  }
});

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
