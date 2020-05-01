import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

type Props = {
  message: string;
  onRetry?: () => any;
};

export const ErrorAlert: React.FunctionComponent<Props> = ({
  message,
  onRetry
}) => {
  return (
    <Alert
      severity="error"
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Try again
          </Button>
        )
      }
    >
      {message}
    </Alert>
  );
};
