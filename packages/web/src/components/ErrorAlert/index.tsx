import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

// TODO: Conditional types (eg, label could be provided only if onRetry is not undefined)
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
    action={
      onRetry && (
        <Button color="inherit" size="small" onClick={onRetry}>
          {retryButtonLabel}
        </Button>
      )
    }
  >
    {message}
  </Alert>
);
