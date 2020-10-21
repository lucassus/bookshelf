import React from "react";

import { useBookCopyUpdatedSubscription } from "./BookCopyUpdated.subscription.generated";

// TODO: Find a better name and place
// TODO: Reconnect subscription on authentication
export const BookCopySubscription: React.FunctionComponent = () => {
  useBookCopyUpdatedSubscription();
  return null;
};
