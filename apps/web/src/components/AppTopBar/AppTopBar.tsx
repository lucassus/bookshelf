import React from "react";
import { Link } from "react-router-dom";

import { useCurrentUser } from "../CurrentUserProvider";
import styles from "./AppTopBar.module.scss";
import { UserMenuButton } from "./UserMenuButton";

export const AppTopBar = () => {
  const currentUser = useCurrentUser();

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

          {currentUser ? (
            <UserMenuButton currentUser={currentUser} />
          ) : (
            <>
              <li>
                <Link to="/signup">Signup</Link>
              </li>

              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
