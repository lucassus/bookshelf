import { Typography, Container, CssBaseline } from "@material-ui/core";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import { AuthorsPage } from "./pages/AuthorsPage";
import { UsersPage } from "./pages/UsersPage";

export const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />
    <Container maxWidth="lg">
      <Typography component="h1" variant="h3">
        Personal Library
      </Typography>

      <Link to="/">Authors</Link>
      <Link to="/users">Users</Link>

      <Routes>
        <Route path="/" element={<AuthorsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Container>
  </>
);
