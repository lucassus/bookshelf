import { action } from "@storybook/addon-actions";
import React, { useState } from "react";

import { StarIconButton } from "./StarIconButton";

export default {
  title: "StarIconButton",
  component: StarIconButton
};

export const Basic = () => {
  const [toggled, setToggled] = useState(false);

  const handleToggled = () => {
    action("toggle-pressed")();
    setToggled((prevToggled) => !prevToggled);
  };

  return (
    <StarIconButton
      labelOff="Add to favourites"
      labelOn="Remove from favourites"
      toggled={toggled}
      onToggle={handleToggled}
    />
  );
};
