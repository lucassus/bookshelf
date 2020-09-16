import React from "react";

import { ErrorAlert } from "./ErrorAlert";

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <ErrorAlert message={error.message || "Something went wrong!"} />;
    }

    return children;
  }
}
