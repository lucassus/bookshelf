import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../AuthContext";
import { useGetCurrentUserQuery } from "../GetCurrentUser.query.generated";
import styles from "./AppTopBar.module.scss";
import { useLogoutMutation } from "./Logout.mutation.generated";

const CurrentUserMenu = () => {
  const auth = useAuth();
  const { data, client } = useGetCurrentUserQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    await client.clearStore();
    auth.unauthorize();
  };

  return (
    <li>
      You are logged in as {data?.currentUser.name}
      <button onClick={handleLogout}>Logout</button>
    </li>
  );
};

export const AppTopBar = () => {
  const auth = useAuth();

  return (
    <header className={styles.container}>
      <nav>
        <h1>
          <Link to="/">Personal Library</Link>
        </h1>

        <ul>
          <li>
            <Link to="/">Books</Link>
          </li>

          <li>
            <Link to="/authors">Authors</Link>
          </li>

          <li>
            <Link to="/users">Users</Link>
          </li>

          {auth.isAuthenticated ? (
            <CurrentUserMenu />
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
