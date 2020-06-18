import React, { MouseEventHandler } from "react";

type Props = {
  labelOn?: string;
  labelOff?: string;
  toggled: boolean;
  onToggle: MouseEventHandler;
};

// TODO: Add nice icons
export const StarIconButton: React.FunctionComponent<Props> = ({
  labelOn,
  labelOff,
  toggled,
  onToggle
}) => (
  <button onClick={onToggle} aria-label={toggled ? labelOn : labelOff}>
    {toggled ? "x" : "o"}
  </button>
);
