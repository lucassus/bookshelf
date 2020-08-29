import { boolean, select, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { Avatar } from "./Avatar";
import { AvatarFragment } from "./Avatar.fragment.generated";

export default {
  title: "Avatar",
  component: Avatar,
  decorators: [withKnobs]
};

// TODO: Is there an option to dry knobs?
export const Basic = () => {
  const name = text("User Name", "Bob");

  const small = boolean("Small", false);

  const avatar: AvatarFragment = {
    __typename: "Avatar",
    image: {
      url:
        "https://res.cloudinary.com/lucassus/image/upload/bookshelf/users/m25.png"
    },
    color: select(
      "Avatar Color",
      ["red", "green", "blue", "yellow", "magenta", "pink", "black"],
      "blue"
    )
  };

  return <Avatar name={name} small={small} avatar={avatar} />;
};

export const Flagged = () => {
  const name = text("User Name", "Bob");

  const small = boolean("Small", false);

  const avatar: AvatarFragment = {
    __typename: "FlaggedAvatarError",
    message: "Avatar is flagged!"
  };

  return <Avatar name={name} small={small} avatar={avatar} />;
};
