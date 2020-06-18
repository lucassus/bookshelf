import React from "react";

import { User } from "../types.generated";

type Props = {
  user: User;
};

export const UserAvatar: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Avatar alt={user.name} src={user.avatar.image.url} />
      <h3>{user.name}</h3>
    </Grid>
  );
};
