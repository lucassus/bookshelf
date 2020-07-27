import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { ErrorAlert } from "./ErrorAlert";

describe("<ErrorAlert />", () => {
  it("renders the given messages", () => {
    const { queryByText, rerender } = render(
      <ErrorAlert message="Something went wrong!" />
    );
    expect(queryByText("Something went wrong!")).toBeInTheDocument();

    rerender(<ErrorAlert message="Some other message" />);
    expect(queryByText("Some other message")).toBeInTheDocument();
  });

  describe("when onRetry is not given", () => {
    it("does not render the retry button", () => {
      const { queryByText } = render(
        <ErrorAlert message="Something went wrong!" />
      );
      expect(queryByText("Try again")).not.toBeInTheDocument();
    });
  });

  describe("when onRetry callback is given", () => {
    it("renders the retry button with default label", () => {
      const { queryByText } = render(
        <ErrorAlert message="Something went wrong!" onRetry={jest.fn()} />
      );

      expect(queryByText("Try again")).toBeInTheDocument();
    });

    it("renders the retry button with the given label", () => {
      const { queryByText } = render(
        <ErrorAlert
          message="Something went wrong!"
          onRetry={jest.fn()}
          retryButtonLabel="Custom retry button label"
        />
      );

      expect(queryByText("Custom retry button label")).toBeInTheDocument();
    });

    it("calls the given callback on click", () => {
      const onRetry = jest.fn();
      const { getByText } = render(
        <ErrorAlert message="Something went wrong!" onRetry={onRetry} />
      );

      fireEvent.click(getByText("Try again"));
      expect(onRetry).toHaveBeenCalled();
    });
  });
});
