import React from "react";

import { User } from "../types.generated";

type Props = {
  user: User;
};

export const UserAvatar: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <Grid container direction="column" alignItems="center">
      <Avatar alt={user.name} src={user.avatar.image.url} />
      <Typography component="h3">{user.name}</Typography>
    </Grid>
  );
};
