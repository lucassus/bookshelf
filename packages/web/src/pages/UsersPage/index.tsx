import React from "react";
import { Link } from "react-router-dom";

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

      {data.users.map((user) => (
        <Link key={user.id} to={`/users/${user.id}`} color="inherit">
          <UserAvatar user={user} />
        </Link>
      ))}
    </div>
  );
};
