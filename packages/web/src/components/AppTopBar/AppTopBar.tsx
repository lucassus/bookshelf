import React from "react";
import { Link } from "react-router-dom";

import styles from "./AppTopBar.module.scss";

export const AppTopBar = () => (
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
      </ul>
    </nav>
  </header>
);
