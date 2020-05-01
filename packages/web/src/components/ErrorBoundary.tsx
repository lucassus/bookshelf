import React from "react";

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<{}, State> {
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
      return <h1>{error.message}</h1>;
    }

    return children;
  }
}
