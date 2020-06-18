import React from "react";

import { User } from "../types.generated";

type Props = {
  user: User;
};

export const UserAvatar: React.FunctionComponent<Props> = ({ user }) => (
  <div>
    <img src={user.avatar.image.url} alt={user.name} />
    <h3>{user.name}</h3>
  </div>
);
