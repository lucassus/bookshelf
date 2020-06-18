import React from "react";

import { Alert } from "../Alert";

type Props = {
  message: string;
  onRetry?: () => any;
  retryButtonLabel?: string;
};

export const ErrorAlert: React.FunctionComponent<Props> = ({
  message,
  onRetry,
  retryButtonLabel = "Try again"
}) => (
  <Alert
    severity="error"
    action={onRetry && <button onClick={onRetry}>{retryButtonLabel}</button>}
  >
    {message}
  </Alert>
);
