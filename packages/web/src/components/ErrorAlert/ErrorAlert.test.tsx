import { fireEvent } from "@testing-library/react";

import { createComponentRenderer } from "../../testUtils/createComponentRenderer";
import { ErrorAlert } from "./ErrorAlert";

describe("<ErrorAlert />", () => {
  const renderComponent = createComponentRenderer(ErrorAlert, {
    message: "Something went wrong!",
    onRetry: undefined
  });

  it("renders the given messages", () => {
    const { queryByText, rerender } = renderComponent({
      message: "Something went wrong!"
    });
    expect(queryByText("Something went wrong!")).toBeInTheDocument();

    rerender({ message: "Some other message" });
    expect(queryByText("Some other message")).toBeInTheDocument();
  });

  describe("when onRetry is not given", () => {
    it("does not render the retry button", () => {
      const { queryByText } = renderComponent({ onRetry: undefined });
      expect(queryByText("Try again")).not.toBeInTheDocument();
    });
  });

  describe("when onRetry callback is given", () => {
    it("renders the retry button with default label", () => {
      const { queryByText } = renderComponent({ onRetry: jest.fn() });
      expect(queryByText("Try again")).toBeInTheDocument();
    });

    it("renders the retry button with the given label", () => {
      const { queryByText } = renderComponent({
        onRetry: jest.fn(),
        retryButtonLabel: "Custom retry button label"
      });

      expect(queryByText("Custom retry button label")).toBeInTheDocument();
    });

    it("calls the given callback on click", () => {
      const onRetry = jest.fn();
      const { getByText } = renderComponent({ onRetry });

      fireEvent.click(getByText("Try again"));
      expect(onRetry).toHaveBeenCalled();
    });
  });
});
