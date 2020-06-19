import React, { MouseEventHandler } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

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
  <button onClick={onToggle} aria-label={toggled ? labelOn : labelOff}>
    {toggled ? <FaStar /> : <FaRegStar />}
  </button>
);
