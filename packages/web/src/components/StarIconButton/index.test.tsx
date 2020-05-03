import { render, fireEvent } from "@testing-library/react";
import React from "react";

import { StarIconButton } from "./index";

// TODO: Dry it with the helper
describe("<StarIconButton />", () => {
  it("renders the label", () => {
    const onToggle = jest.fn();

    const { getByLabelText, rerender } = render(
      <StarIconButton
        labelOn="Remove from favourites"
        labelOff="Add to favourites"
        toggled={false}
        onToggle={onToggle}
      />
    );

    expect(getByLabelText("Add to favourites")).toBeInTheDocument();

    rerender(
      <StarIconButton
        labelOn="Remove from favourites"
        labelOff="Add to favourites"
        toggled
        onToggle={onToggle}
      />
    );

    expect(getByLabelText("Remove from favourites")).toBeInTheDocument();
  });

  it("handles on click", () => {
    const onToggle = jest.fn();

    const { getByLabelText } = render(
      <StarIconButton
        labelOn="Remove from favourites"
        labelOff="Add to favourites"
        toggled={false}
        onToggle={onToggle}
      />
    );

    fireEvent.click(getByLabelText("Add to favourites"));

    expect(onToggle).toHaveBeenCalled();
  });
});
