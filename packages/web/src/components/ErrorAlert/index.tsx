import React from "react";

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
