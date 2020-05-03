import { fireEvent } from "@testing-library/react";

import { createComponentRenderer } from "../../testUtils";
import { ErrorAlert } from "./index";

const renderComponent = createComponentRenderer(ErrorAlert, {
  message: "Something went wrong!",
  onRetry: undefined
});

describe("<ErrorAlert />", () => {
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
    it("renders the retry button", () => {
      const { queryByText } = renderComponent({ onRetry: jest.fn() });
      expect(queryByText("Try again")).toBeInTheDocument();
    });

    it("calls the given callback on click", () => {
      const onRetry = jest.fn();
      const { getByText } = renderComponent({ onRetry });

      fireEvent.click(getByText("Try again"));
      expect(onRetry).toHaveBeenCalled();
    });
  });
});
