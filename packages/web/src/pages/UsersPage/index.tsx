import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";

import { UserAvatar } from "../../components/UserAvatar";
import { useGetUsersQuery } from "../../generated/graphql";

export const UsersPage: React.FunctionComponent = () => {
  const { loading, error, data } = useGetUsersQuery();

  if (loading) {
    return (
      <div>
        <CircularProgress />
        <span>Loading users...</span>
      </div>
    );
  }

  if (error || !data) {
    return <Alert severity="error">Could not load users...</Alert>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2">
        Users
      </Typography>

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={3}
      >
        {data.users.map((user) => (
          <Grid item key={user.id}>
            <UserAvatar user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
