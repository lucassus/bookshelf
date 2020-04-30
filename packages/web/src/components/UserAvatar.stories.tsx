import { withKnobs, text } from "@storybook/addon-knobs";
import React from "react";

import { User } from "../types.generated";
import { UserAvatar } from "./UserAvatar";

export default {
  title: "UserAvatar",
  component: UserAvatar,
  decorators: [withKnobs]
};

export const Basic = () => {
  const user: User = {
    id: 1,
    name: text("User Name", "Bob"),
    email: "bob@email.com",
    avatar: {
      image: {
        url: "http://examples.devmastery.pl/assets/images/avatars/m25.png"
      },
      color: "yellow"
    }
  };

  return <UserAvatar user={user} />;
};
