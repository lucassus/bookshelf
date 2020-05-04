import { IconButton } from "@material-ui/core";
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon
} from "@material-ui/icons";
import React from "react";

type Props = {
  labelOn?: string;
  labelOff?: string;
  toggled: boolean;
  onToggle: () => any;
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
