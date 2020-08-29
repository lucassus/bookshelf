import React from "react";
import { Link } from "react-router-dom";

import { ErrorAlert } from "../../components/ErrorAlert";
import { UserCard } from "../../components/UserCard";
import { useGetUsersQuery } from "./GetUsers.query.generated";
import styles from "./UsersPage.module.scss";

export const UsersPage: React.FunctionComponent = () => {
  const { loading, error, data } = useGetUsersQuery();

  if (loading) {
    return <span>Loading users...</span>;
  }

  if (error || !data) {
    return <ErrorAlert message="Could not load users..." />;
  }

  const { users } = data;

  return (
    <div>
      <h2>Users</h2>

      <div className={styles.list}>
        {users.map((user) => (
          <Link key={user.id} to={`/users/${user.id}`} color="inherit">
            <UserCard user={user} />
          </Link>
        ))}
      </div>
    </div>
  );
};
