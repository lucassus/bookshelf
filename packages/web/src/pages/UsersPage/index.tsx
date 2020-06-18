import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { ErrorAlert } from "../../components/ErrorAlert";
import { UserAvatar } from "../../components/UserAvatar";
import { useGetUsersQuery } from "./queries.generated";

export const UsersPage: React.FunctionComponent = () => {
  const { loading, error, data } = useGetUsersQuery();

  if (loading) {
    return <span>Loading users...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Could not load users..." />;
  }

  return (
    <div>
      <h4>Users</h4>

      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={3}
      >
        {data.users.map((user) => (
          <Grid item key={user.id}>
            <Link
              component={RouterLink}
              to={`/users/${user.id}`}
              color="inherit"
              underline="none"
            >
              <UserAvatar user={user} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
