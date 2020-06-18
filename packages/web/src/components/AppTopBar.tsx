import React from "react";
import { Link } from "react-router-dom";

export const AppTopBar = () => (
  <div>
    <h1>Personal Library</h1>

    <Link to="/">Books</Link>
    <Link to="/authors">Authors</Link>
    <Link to="/users">Users</Link>
  </div>
);
