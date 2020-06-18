import React, { MouseEventHandler } from "react";

type Props = {
  labelOn?: string;
  labelOff?: string;
  toggled: boolean;
  onToggle: MouseEventHandler;
};

export const StarIconButton: React.FunctionComponent<Props> = ({
  labelOn,
  labelOff,
  toggled,
  onToggle
}) => (
  <IconButton onClick={onToggle} aria-label={toggled ? labelOn : labelOff}>
    {toggled ? <StarIcon /> : <StarBorderIcon />}
  </IconButton>
);
