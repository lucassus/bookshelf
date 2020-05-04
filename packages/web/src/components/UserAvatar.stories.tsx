import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { createUser } from "../testUtils/factories";
import { UserAvatar } from "./UserAvatar";

export default {
  title: "UserAvatar",
  component: UserAvatar,
  decorators: [withKnobs]
};

export const Basic = () => {
  const user = createUser({ name: text("User Name", "Bob") });
  return <UserAvatar user={user} />;
};
