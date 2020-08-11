import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../AuthContext";
import { CurrentUserFragment } from "../AuthContext/CurrentUser.fragment.generated";
import styles from "./AppTopBar.module.scss";

const CurrentUserMenu: React.FunctionComponent<{
  currentUser: CurrentUserFragment;
}> = ({ currentUser }) => {
  const { unauthorize } = useAuth();

  return (
    <li>
      You are logged in as {currentUser.name}
      <button onClick={() => unauthorize()}>Logout</button>
    </li>
  );
};

export const AppTopBar = () => {
  const { currentUser } = useAuth();

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
            <CurrentUserMenu currentUser={currentUser} />
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
