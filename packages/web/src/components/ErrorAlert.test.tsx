import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { ErrorAlert } from "./ErrorAlert";

type ComponentProps = React.ComponentProps<typeof ErrorAlert>;

// TODO: Dry it
function renderComponent(props: Partial<ComponentProps> = {}) {
  const baseProps: ComponentProps = {
    message: "Something went wrong!",
    onRetry: undefined
  };

  const { rerender, ...rest } = render(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ErrorAlert {...baseProps} {...props} />
  );

  return {
    rerender: (newProps: Partial<ComponentProps> = {}) =>
      // eslint-disable-next-line react/jsx-props-no-spreading
      rerender(<ErrorAlert {...baseProps} {...props} {...newProps} />),
    ...rest
  };
}

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
