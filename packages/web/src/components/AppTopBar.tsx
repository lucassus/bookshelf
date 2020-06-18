import React from "react";
import { Link } from "react-router-dom";

export const AppTopBar = () => (
  <header>
    <nav>
      <h1>Personal Library</h1>

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
