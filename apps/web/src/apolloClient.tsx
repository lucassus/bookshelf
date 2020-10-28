import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { sha256 } from "crypto-hash";
import { SubscriptionClient } from "subscriptions-transport-ws";

import { GRAPHQL_SUBSCRIPTIONS_URI, GRAPHQL_URI } from "./config";
import introspectionResult from "./introspectionResult.generated";

const httpLink = createPersistedQueryLink({
  useGETForHashedQueries: true,
  sha256
}).concat(new HttpLink({ uri: GRAPHQL_URI }));

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

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: true,
    possibleTypes: introspectionResult.possibleTypes
  }),
  link: splitLink
});

// Forces re-authenticate the websocket connection
export const resetWsConnection = () => {
  const {
    subscriptionClient
  }: { subscriptionClient: SubscriptionClient } = wsLink as any;

  subscriptionClient.close(false, false);
};
