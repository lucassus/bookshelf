import { select, text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { Avatar } from "./Avatar";
import { AvatarFragment } from "./Avatar.fragment.generated";

export default {
  title: "Avatar",
  component: Avatar,
  decorators: [withKnobs]
};

const getUserName = () => text("User Name", "Bob");

const getSize = () => select("Size", ["small", "medium"], "medium");

export const Basic = () => {
  const avatar: AvatarFragment = {
    __typename: "Avatar",
    image: {
      url: select(
        "Image URL",
        [
          "https://res.cloudinary.com/lucassus/image/upload/bookshelf/users/w13.png",
          "https://res.cloudinary.com/lucassus/image/upload/bookshelf/users/m10.png",
          "https://res.cloudinary.com/lucassus/image/upload/bookshelf/users/w2.png",
          "https://res.cloudinary.com/lucassus/image/upload/bookshelf/users/m25.png"
        ],
        "https://res.cloudinary.com/lucassus/image/upload/bookshelf/users/m25.png"
      )
    },
    color: select(
      "Avatar Color",
      ["red", "green", "blue", "yellow", "magenta", "pink", "black"],
      "blue"
    )
  };

  return <Avatar name={getUserName()} size={getSize()} avatar={avatar} />;
};

export const Flagged = () => {
  const avatar: AvatarFragment = {
    __typename: "FlaggedAvatarError",
    message: "Avatar is flagged!"
  };

  return <Avatar name={getUserName()} size={getSize()} avatar={avatar} />;
};
