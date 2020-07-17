import React, { MouseEventHandler } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

type Props = {
  labelOn?: string;
  labelOff?: string;
  toggled: boolean;
  onToggle: MouseEventHandler;
  disabled?: boolean;
};

export const StarIconButton: React.FunctionComponent<Props> = ({
  labelOn,
  labelOff,
  toggled,
  onToggle,
  disabled
}) => (
  <button
    disabled={disabled}
    onClick={onToggle}
    aria-label={toggled ? labelOn : labelOff}
  >
    {toggled ? <FaStar /> : <FaRegStar />}
  </button>
);
