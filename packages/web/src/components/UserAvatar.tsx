import { Avatar, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { User } from "../types.generated";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20)
  }
}));

type Props = {
  user: Partial<User>;
};

export const UserAvatar: React.FunctionComponent<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center">
      <Avatar
        alt={user.name}
        src={user.avatar.image.url}
        className={classes.large}
      />
      <Typography component="h3">{user.name}</Typography>
    </Grid>
  );
};
