import React from "react";

import { Alert } from "../Alert";
import { Button } from "../Button";

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
    action={onRetry && <Button onClick={onRetry}>{retryButtonLabel}</Button>}
  >
    {message}
  </Alert>
);
