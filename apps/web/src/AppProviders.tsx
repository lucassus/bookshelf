import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { CloudinaryContext } from "cloudinary-react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { CurrentUserProvider } from "./components/CurrentUserProvider";
import { GRAPHQL_URI, GRAPHQL_SUBSCRIPTIONS_URI } from "./config";
import introspectionResult from "./introspectionResult.generated";

function createApolloClient() {
  const httpLink = new HttpLink({ uri: GRAPHQL_URI });

  const wsLink = new WebSocketLink({
    uri: GRAPHQL_SUBSCRIPTIONS_URI,
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
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </ApolloProvider>
    </CloudinaryContext>
  </Router>
);
