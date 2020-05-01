import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { ErrorAlert } from "./ErrorAlert";

describe("<ErrorAlert />", () => {
  const renderComponent = ({
    message = "Something went wrong!",
    onRetry
  }: Partial<React.ComponentProps<typeof ErrorAlert>> = {}) => ({
    ...render(<ErrorAlert message={message} onRetry={onRetry} />),
    message,
    onRetry
  });

  it("renders the given messages", () => {
    const { queryByText, message } = renderComponent();

    expect(queryByText(message)).toBeInTheDocument();
    expect(queryByText("Retry")).not.toBeInTheDocument();
  });

  describe("when onRetry is not given", () => {
    it("does not render the retry button", () => {
      const { queryByText } = renderComponent({ onRetry: undefined });
      expect(queryByText("Retry")).not.toBeInTheDocument();
    });
  });

  describe("when onRetry callback is given", () => {
    it("renders the retry button", () => {
      const { queryByText } = renderComponent({ onRetry: jest.fn() });
      expect(queryByText("Retry")).toBeInTheDocument();
    });

    it("calls the given callback on click", () => {
      const { getByText, onRetry } = renderComponent({ onRetry: jest.fn() });

      fireEvent.click(getByText("Retry"));
      expect(onRetry).toHaveBeenCalled();
    });
  });
});
