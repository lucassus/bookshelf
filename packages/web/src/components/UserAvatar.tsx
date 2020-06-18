import React from "react";

import { User } from "../types.generated";

type Props = {
  user: User;
};

export const UserAvatar: React.FunctionComponent<Props> = ({ user }) => (
  <figure>
    <img
      src={user.avatar.image.url}
      alt={user.name}
      style={{ borderRadius: "50%" }}
    />
    <figcaption>{user.name}</figcaption>
  </figure>
);
