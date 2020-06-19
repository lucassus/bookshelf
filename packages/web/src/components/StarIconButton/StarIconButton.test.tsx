import { fireEvent } from "@testing-library/react";

import { createComponentRenderer } from "../../testUtils/createComponentRenderer";
import { StarIconButton } from "./StarIconButton";

describe("<StarIconButton />", () => {
  const renderComponent = createComponentRenderer(StarIconButton, {
    labelOn: "Remove from favourites",
    labelOff: "Add to favourites",
    toggled: false,
    onToggle: () => {}
  });

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
