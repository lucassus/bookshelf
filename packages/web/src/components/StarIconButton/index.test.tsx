import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { StarIconButton } from "./index";

type ComponentProps = React.ComponentProps<typeof StarIconButton>;

// TODO: Dry it
function renderComponent(props: Partial<ComponentProps> = {}) {
  const baseProps: ComponentProps = {
    labelOn: "Remove from favourites",
    labelOff: "Add to favourites",
    toggled: false,
    onToggle: () => {}
  };

  const { rerender, ...rest } = render(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <StarIconButton {...baseProps} {...props} />
  );

  return {
    rerender: (newProps: Partial<ComponentProps> = {}) =>
      // eslint-disable-next-line react/jsx-props-no-spreading
      rerender(<StarIconButton {...baseProps} {...props} {...newProps} />),
    ...rest
  };
}

describe("<StarIconButton />", () => {
  it("renders the label", () => {
    const { getByLabelText, rerender } = renderComponent({
      labelOn: "Remove",
      labelOff: "Add"
    });
    expect(getByLabelText("Add")).toBeInTheDocument();

    rerender({ toggled: true });
    expect(getByLabelText("Remove")).toBeInTheDocument();
  });

  it("handles onToggle", () => {
    const onToggle = jest.fn();
    const { getByLabelText } = renderComponent({ onToggle });

    fireEvent.click(getByLabelText("Add to favourites"));
    expect(onToggle).toHaveBeenCalled();
  });
});
