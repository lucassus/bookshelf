import {
  Typography,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Button
} from "@material-ui/core";
import React from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";

import { AuthorsPage } from "./pages/AuthorsPage";
import { UsersPage } from "./pages/UsersPage";

export const App: React.FunctionComponent = () => (
  <>
    <CssBaseline />

    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" component="h1">
          Personal Library
        </Typography>

        <nav>
          <Button component={RouterLink} to="/">
            Authors
          </Button>
          <Button component={RouterLink} to="/users">
            Users
          </Button>
        </nav>
      </Toolbar>
    </AppBar>

    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<AuthorsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Container>
  </>
);
