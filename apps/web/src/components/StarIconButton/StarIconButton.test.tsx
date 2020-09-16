import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { StarIconButton } from "./StarIconButton";

describe("<StarIconButton />", () => {
  it("renders the label", () => {
    const { getByLabelText, rerender } = render(
      <StarIconButton
        toggled={false}
        onToggle={jest.fn()}
        labelOn="Remove"
        labelOff="Add"
      />
    );
    expect(getByLabelText("Add")).toBeInTheDocument();

    rerender(
      <StarIconButton
        toggled
        onToggle={jest.fn()}
        labelOn="Remove"
        labelOff="Add"
      />
    );
    expect(getByLabelText("Remove")).toBeInTheDocument();
  });

  it("handles onToggle", () => {
    const onToggle = jest.fn();
    const { getByLabelText } = render(
      <StarIconButton
        toggled={false}
        onToggle={onToggle}
        labelOn="Remove"
        labelOff="Add to favourites"
      />
    );

    fireEvent.click(getByLabelText("Add to favourites"));
    expect(onToggle).toHaveBeenCalled();
  });
});
