import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from "@apollo/client";
import { CloudinaryContext } from "cloudinary-react";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { BookCopySubscription } from "./components/BookCopySubscription";
import { CurrentUserProvider } from "./components/CurrentUserProvider";
import { GRAPHQL_ENDPOINT } from "./config";
import introspectionResult from "./introspectionResult.generated";

function createApolloClient() {
  const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });

  const wsLink = new WebSocketLink({
    // TODO: Move it to the config
    uri: "ws://localhost:4000/graphql",
    options: {
      reconnect: true
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: true,
      possibleTypes: introspectionResult.possibleTypes
    }),
    link: splitLink
  });
}

const client = createApolloClient();

export const AppProviders: React.FunctionComponent = ({ children }) => (
  <Router>
    <CloudinaryContext cloudName="lucassus">
      <ApolloProvider client={client}>
        <BookCopySubscription />
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </ApolloProvider>
    </CloudinaryContext>
  </Router>
);
