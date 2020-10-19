import React from "react";

import { useBookCopyBorrowedSubscription } from "./BookCopyBorrowed.subscription.generated";
import { useBookCopyReturnedSubscription } from "./BookCopyReturned.subscription.generated";

// TODO: Find a better place (maybe along with buttons)
// TODO: Reconnect subscription on authentication
export const BookCopySubscription: React.FunctionComponent = () => {
  useBookCopyBorrowedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("useBookCopyBorrowedSubscription");
      console.log(subscriptionData.data);
    }
  });

  useBookCopyReturnedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("useBookCopyReturnedSubscription");
      console.log(subscriptionData.data);
    }
  });

  return null;
};
