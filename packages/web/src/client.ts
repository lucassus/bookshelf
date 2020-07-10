import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

import { GRAPHQL_ENDPOINT } from "./config";

const cache = new InMemoryCache({
  addTypename: true,
  resultCaching: false
});

export const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: GRAPHQL_ENDPOINT, fetch }),
  queryDeduplication: false
});
