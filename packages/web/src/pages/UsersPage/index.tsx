import {
  CircularProgress,
  Container,
  Grid,
  Typography
} from "@material-ui/core";
import React from "react";

import { ErrorAlert } from "../../components/ErrorAlert";
import { UserAvatar } from "../../components/UserAvatar";
import { useGetUsersQuery } from "./queries.generated";

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
    return <ErrorAlert message="Could not load users..." />;
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
