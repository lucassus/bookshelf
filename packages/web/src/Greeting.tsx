import { gql, NetworkStatus, useQuery } from "@apollo/client";
import React from "react";

export const MESSAGE_QUERY = gql`
  query getMessage {
    message
  }
`;

export const Greeting: React.FunctionComponent = () => {
  const { data, networkStatus } = useQuery<{ message: string }>(MESSAGE_QUERY, {
    notifyOnNetworkStatusChange: true
  });

  if (!data || networkStatus === NetworkStatus.loading) {
    return <span>Message is loading...</span>;
  }

  return <div>{data.message}</div>;
};
