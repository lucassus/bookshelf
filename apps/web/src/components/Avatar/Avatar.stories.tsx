import { select, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { Avatar } from "./Avatar";
import { AvatarFragment } from "./Avatar.fragment.generated";

export default {
  title: "Avatar",
  component: Avatar,
  decorators: [withKnobs]
};

const getAlt = () => text("Label", "Bob");

const getSize = () => select("Size", ["small", "medium"], "medium");

export const Basic = () => {
  const avatar: AvatarFragment = {
    __typename: "Avatar",
    image: {
      path: select(
        "Image",
        [
          "/bookshelf/users/w13.png",
          "/bookshelf/users/m10.png",
          "/bookshelf/users/w2.png",
          "/bookshelf/users/m25.png"
        ],
        "/bookshelf/users/m25.png"
      )
    },
    color: select(
      "Avatar Color",
      ["red", "green", "blue", "yellow", "magenta", "pink", "black"],
      "blue"
    )
  };

  return <Avatar label={getAlt()} size={getSize()} avatar={avatar} />;
};

export const Flagged = () => {
  const avatar: AvatarFragment = {
    __typename: "FlaggedAvatarError",
    message: "Avatar is flagged!"
  };

  return <Avatar label={getAlt()} size={getSize()} avatar={avatar} />;
};
