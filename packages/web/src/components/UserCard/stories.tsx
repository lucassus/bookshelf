import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { UserCard } from "./UserCard";
import { UserCardFragment } from "./UserCard.fragment.generated";

export default {
  title: "UserAvatar",
  component: UserCard,
  decorators: [withKnobs]
};

export const Basic = () => {
  const user: UserCardFragment = {
    name: text("User Name", "Bob"),
    avatar: {
      __typename: "Avatar",
      image: {
        url:
          "https://res.cloudinary.com/lucassus/image/upload/bookshelf/users/m25.png"
      },
      color: "blue"
    }
  };

  return <UserCard user={user} />;
};
