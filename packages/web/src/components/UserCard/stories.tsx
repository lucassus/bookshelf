import { text, withKnobs } from "@storybook/addon-knobs";
import React from "react";

import { createUser } from "../../testUtils/factories";
import { UserCard } from "./UserCard";

export default {
  title: "UserAvatar",
  component: UserCard,
  decorators: [withKnobs]
};

export const Basic = () => {
  const user = createUser({ name: text("User Name", "Bob") });
  return <UserCard user={user} />;
};
