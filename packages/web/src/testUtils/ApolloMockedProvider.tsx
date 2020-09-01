import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";
import { mergeResolvers } from "@graphql-tools/merge";
import { addMocksToSchema } from "@graphql-tools/mock";
import { addResolversToSchema } from "@graphql-tools/schema";
import { SchemaLink } from "apollo-link-schema";
import { buildClientSchema } from "graphql";
import React from "react";

import introspectionResult from "../schema.generated.json";
import { mocks } from "./mocks";
import { resolvers } from "./resolvers";

type Props = {
  // TODO: Better typing
  customResolvers?: any;
};

// TODO: Figure out how to dry it, see @bookshelf/fake-server
export const ApolloMockedProvider: React.FunctionComponent<Props> = ({
  customResolvers = {},
  children
}) => {
  const schemaWithResolvers = addResolversToSchema({
    schema: buildClientSchema(introspectionResult as any),
    resolvers,
    inheritResolversFromInterfaces: true
  });

  const schema = addMocksToSchema({
    schema: schemaWithResolvers,
    mocks: mergeResolvers([mocks, customResolvers]),
    preserveResolvers: true
  });

  const client = new ApolloClient({
    // TODO: See https://github.com/apollographql/apollo-link/issues/1258#issuecomment-604031488
    link: (new SchemaLink({
      schema,
      context: {
        // TODO: Dry it
        assetsBaseUrl:
          "https://res.cloudinary.com/lucassus/image/upload/bookshelf"
      }
    }) as unknown) as ApolloLink,
    cache: new InMemoryCache()
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
